

export async function updateUser(id, data) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/update-user/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (err) {
    console.error("사용자 수정 실패", err);
    return false;
  }
}

export async function deleteUserById(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/update-user/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delete: true }),
    });
    return res.ok;
  } catch (err) {
    console.error("사용자 삭제 실패", err);
    return false;
  }
}