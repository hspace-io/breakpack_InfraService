import { useEffect, useState } from "react";
import { getAllUsers } from "../../../hook/Auth/AuthGet";
import { updateUser, deleteUserById } from "../../../hook/Auth/AuthModi";
import { Verify } from "../../../hook/Auth/AuthVerify";
import { useNavigate } from "react-router-dom";
import * as S from "./AuthInfoStyled";

const AuthInfo = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await Verify();
      if (!result.username || result.auth_level < 2) {
        alert("관리자 권한이 필요합니다.");
        navigate('/dashboard');
      } else {
        setAuthChecked(true); // 권한 OK → 렌더링 시작
      }
    };
    checkLoginStatus();
  }, []);

  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleEditChange = (id, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const saveChanges = async (id) => {
    const payload = editing[id];
    const success = await updateUser(id, payload);
    if (success) {
      alert("수정 완료");
      location.reload();
    } else {
      alert("수정 실패");
    }
  };

  const deleteUser = async (id) => {
    const success = await deleteUserById(id);
    if (success) {
      alert("삭제 완료");
      location.reload();
    } else {
      alert("삭제 실패");
    }
  };


  if (!authChecked) return null;
  return (
    <S.Container>
      <S.Title>회원 목록</S.Title>
      <S.BackButton onClick={() => navigate('/dashboard')}>
        대시보드로 돌아가기
      </S.BackButton>
      <S.Table>
        <thead>
          <tr>
            <S.Th>아이디</S.Th>
            <S.Th>이메일</S.Th>
            <S.Th>권한</S.Th>
            <S.Th>작업</S.Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const edit = editing[user.id] || {};
            return (
              <tr key={user.id}>
                <S.Td>
                  <input
                    value={edit.username ?? user.username}
                    onChange={(e) => handleEditChange(user.id, "username", e.target.value)}
                  />
                </S.Td>
                <S.Td>
                  <input
                    value={edit.email ?? user.email}
                    onChange={(e) => handleEditChange(user.id, "email", e.target.value)}
                  />
                </S.Td>
                <S.Td>
                  <input
                    type="number"
                    min="0"
                    max="9"
                    value={edit.auth_level ?? user.auth_level}
                    onChange={(e) => handleEditChange(user.id, "auth_level", parseInt(e.target.value))}
                  />
                </S.Td>
                <S.Td>
                  <button onClick={() => saveChanges(user.id)}>수정</button>
                  <button onClick={() => deleteUser(user.id)}>삭제</button>
                </S.Td>
              </tr>
            );
          })}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default AuthInfo;
