import cv2
from fastapi.responses import StreamingResponse
from fastapi import Response
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import io

import subprocess
import yaml

def get_screenshot_bytes(port: int):
    try:
        url = f"http://localhost:{port - 10000}"
        chrome_options = Options()
        chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-software-rasterizer")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-background-networking")
        chrome_options.add_argument("--disable-sync")
        chrome_options.add_argument("--metrics-recording-only")
        chrome_options.add_argument("--disable-default-apps")
        chrome_options.add_argument("--window-size=1280,720")
        
        driver = webdriver.Chrome(options=chrome_options)
        driver.get(url)
        png = driver.get_screenshot_as_png()
        driver.quit()
        return png
    except Exception as e:
        print(e, url)

def deploy_yaml_to_kubernetes(yaml_content: str):
    print(yaml_content)
    try:
        # Parse the YAML to extract namespaces
        docs = list(yaml.safe_load_all(yaml_content))
        namespaces = set()
        for doc in docs:
            if isinstance(doc, dict):
                ns = doc.get("metadata", {}).get("namespace")
                if ns:
                    namespaces.add(ns)

        # Create namespaces if they do not exist
        for ns in namespaces:
            result = subprocess.run(
                ["kubectl", "create", "namespace", ns],
                capture_output=True,
                text=True,
                check=False  # 여긴 check=False로 유지하고
            )
            if result.returncode != 0 and "AlreadyExists" not in result.stderr:
              print(f"❌ Failed to create namespace {ns}:\n{result.stderr}")

        # Apply the YAML
        try:
            result = subprocess.run(
                ["kubectl", "apply", "-f", "-"],
                input=yaml_content,
                text=True,
                capture_output=True,
                check=True
            )
            print("✅ YAML deployment successful:\n", result.stdout) 
        except subprocess.CalledProcessError as e:
            print("❌ Error during apply:\n", e.stderr)
        
    except subprocess.CalledProcessError as e:
        print("❌ YAML deployment failed:\n", e.stderr)
        raise RuntimeError("Deployment failed") from e