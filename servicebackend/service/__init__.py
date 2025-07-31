import importlib
import os

routers = []

current_dir = os.path.dirname(__file__)

for folder_name in os.listdir(current_dir):
    sub_path = os.path.join(current_dir, folder_name)
    if os.path.isdir(sub_path):
        route_file_name = f"{folder_name}_route.py"
        route_file = os.path.join(sub_path, route_file_name)

        if os.path.isfile(route_file):
            module_name = f"service.{folder_name}.{folder_name}_route"
            module = importlib.import_module(module_name)

            if hasattr(module, "router") and not getattr(module, "__EXCLUDING_ROUTE__", False):
                routers.append(module.router)

# 추가: router 폴더 직접 로드
router_folder = os.path.join(current_dir, "router")
for file in os.listdir(router_folder):
    if file.endswith(".py") and file != "__init__.py":
        module_name = f"service.router.{file[:-3]}"
        module = importlib.import_module(module_name)
        if hasattr(module, "router"):
            routers.append(module.router)

__all__ = ["routers"]