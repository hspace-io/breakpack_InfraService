import React, { useState, useEffect } from 'react'
import * as S from './AdminStyled'
import { createService } from '../../hook/PodMake'
import { fetchInstances } from '../../hook/PodGetList'
import { deleteInstanceById } from '../../hook/PodDelete'
import { motion } from 'framer-motion'
import { AnimatedContainer } from './AdminStyled'

const CreateServicePage = () => {
  const [form, setForm] = useState({
    image: '',
    service_name: '',
    port: '',
    yaml: '',
    yaml_oneline: ''
  })

  const [result, setResult] = useState(null)

  const [instances, setInstances] = useState([])

  const [deleteId, setDeleteId] = useState('')
  const [deleteResult, setDeleteResult] = useState(null)

  // Popup state
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState("")

  const handleChange = e => {
    const { name, value } = e.target
  
    setForm(prev => {
      const updated = { ...prev, [name]: value }
      if (name === "yaml") {
        updated.yaml_oneline = formatYamlToSingleLine(value)
      }
      return updated
    })
  }

  const handleSubmit = async () => {
    try {
      const data = await createService(form)
      setResult(data)
    } catch (err) {
      console.error(err)
      setResult({ error: err.message })
    }
  }

  function formatYamlToSingleLine(yamlString) {
    return yamlString
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '')
      .join('\\n');
  }

  const fetchInstancesWrapper = async () => {
    const data = await fetchInstances()
    setInstances(data)
  }

  useEffect(() => {
    fetchInstancesWrapper()
  }, [])

  const handleRefresh = () => {
    fetchInstancesWrapper()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const res = await deleteInstanceById(deleteId)
    setDeleteResult(res)
    if (res.success) fetchInstancesWrapper()
  }

  return (
    <S.Wrapper>
      <S.Button style={{ position: 'absolute', top: '1rem', left: '1rem' }} onClick={() => window.location.href = '/dashboard'}>
        Go to Dashboard
      </S.Button>
      <h2>Administrate Resource</h2>
      <S.DescriptWrapper
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
      >
        <h2>Usage</h2>
        <ul>
          <li>
            서비스를 만들수 있습니다. 먼저 서버 쪽에서 이미지가 필요합니다. docker등으로 이미지를 빌드하여 minikube가 사용할 수 있는 상태로 만듭니다.
          </li>
          <li>
            이후 예시 YAML과 같이 작성하고, Deploy하면 됩니다.
          </li>
          <li>
            포트는 40200 ~ 40300 범위를 이용해 작성하고, 내부 서비스의 포트는 30200 ~ 30300 범위를 이용합니다. (이후 포트포워딩도 진행합니다.)
          </li>
          <li>
            YAML안의 namespace는 service name과 되도록 동일한 이름을 사용해 주세요
          </li>
          <li>
            서비스가 정상적으로 열렸다면 http://knights.hspace.io:40201/ 과 같은 Url로 접근 가능합니다.
          </li>
        </ul>
        <S.Button onClick={() => {
          setPopupContent(
            `<div style="display: flex; gap: 2em;">
              <pre style="flex: 1; white-space: pre-wrap;"># Mariadb <br/>
apiVersion: v1
kind: Service
metadata:
  name: mariadb
  namespace: shop-mall-1
spec:
  selector:
    app: mariadb
  ports:
    - port: 3306
      targetPort: 3306
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mariadb
  namespace: shop-mall-1
spec:
  selector:
    matchLabels:
      app: mariadb
  replicas: 1
  template:
    metadata:
      labels:
        app: mariadb
    spec:
      containers:
        - name: mariadb
          image: mariadb:10.5
          ports:
            - containerPort: 3306
          env:
            - name: MYSQL_ROOT_PASSWORD
              value: "rootpassword"
            - name: MYSQL_DATABASE
              value: "shoppingmall"
            - name: MYSQL_USER
              value: "user"
            - name: MYSQL_PASSWORD
              value: "password"
          volumeMounts:
            - name: mariadb-storage
              mountPath: /var/lib/mysql
      volumes:
        - name: mariadb-storage
          emptyDir: {}
</pre>
              <pre style="flex: 1; white-space: pre-wrap;"># Web  <br/>
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: shop-mall-1
spec:
  selector:
    app: web
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
      nodePort: 30201
  type: NodePort
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: shop-mall-1
spec:
  selector:
    matchLabels:
      app: web
  replicas: 1
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: space-pentest-mall:latest
          ports:
            - containerPort: 5000
          env:
            - name: FLASK_APP
              value: "app.py"
            - name: FLASK_RUN_HOST
              value: "0.0.0.0"
            - name: DATABASE_HOST
              value: "mariadb"
            - name: DATABASE_USER
              value: "user"
            - name: DATABASE_PASSWORD
              value: "password"
            - name: DATABASE_NAME
              value: "shoppingmall"
            - name: MYSQL_ROOT_PASSWORD
              value: "supersecretrootpassword"
          imagePullPolicy: IfNotPresent
</pre>
            </div>`
          )
          setShowPopup(true)
        }}>예시 YAML 보기</S.Button>
      </S.DescriptWrapper>
      <S.ContainerWrapper>
        <AnimatedContainer
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        >
          <h2>Create & Deploy Service</h2>
          <S.Input
            type="text"
            name="image"
            placeholder="Docker Image"
            value={form.image}
            onChange={handleChange}
          />
          <S.Input
            type="text"
            name="service_name"
            placeholder="Service Name (‼️ NameSpace로 사용되는 이름입니다!)"
            value={form.service_name}
            onChange={handleChange}
          />
          <S.Input
            type="number"
            name="port"
            placeholder="Port"
            value={form.port}
            onChange={handleChange}
          />
          <S.TextArea
            name="yaml"
            placeholder="Kubernetes YAML"
            rows="8"
            value={form.yaml}
            onChange={handleChange}
          />
          <S.InputOneline
            name="yaml_oneline"
            placeholder="Kubernetes YAML to Oneline"
            value={form.yaml_oneline}
          />
          <S.Button onClick={handleSubmit}>Deploy</S.Button>

          {result && (
            <S.ResultBox>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </S.ResultBox>
          )}
        </AnimatedContainer>
        <AnimatedContainer
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
        >
          <h2>Instance List (auto-refresh)</h2>
          <S.Button onClick={handleRefresh}>Refresh</S.Button>
          <S.ResultBox>
            <ul>
              {instances.map((inst) => (
                <li key={inst.id}>
                  <p>Name: {inst.name}</p>
                  <p>Port: {inst.port}</p>
                  <p>ID: {inst.id}</p>
                </li>
              ))}
            </ul>
          </S.ResultBox>
        </AnimatedContainer>
        <AnimatedContainer
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
        >
          <h2>Delete Instance</h2>
          <S.Input
            type="text"
            placeholder="Instance ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <S.Button onClick={handleDelete}>Delete</S.Button>
          {deleteResult && (
            <S.ResultBox>
              <pre>{JSON.stringify(deleteResult, null, 2)}</pre>
            </S.ResultBox>
          )}
        </AnimatedContainer>
      </S.ContainerWrapper>
      {showPopup && (
        <S.PopupOverlay onClick={() => setShowPopup(false)}>
          <S.PopupContent onClick={e => e.stopPropagation()}>
            <S.CloseButton onClick={() => setShowPopup(false)}>×</S.CloseButton>
            <div dangerouslySetInnerHTML={{ __html: popupContent }} />
          </S.PopupContent>
        </S.PopupOverlay>
      )}
    </S.Wrapper>
  )
}

export default CreateServicePage