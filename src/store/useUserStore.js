import { create } from 'zustand'

const useUserStore = create((set) => ({
  users: [
    { id: 1, name: 'Alex', age: 22, status: true },
    { id: 2, name: 'John', age: 25, status: false },
    { id: 3, name: 'Mike', age: 19, status: true },
    { id: 4, name: 'David', age: 28, status: false },
    { id: 5, name: 'James', age: 21, status: true }
  ],
  addUser: user => set(state => ({ users: [...state.users, user] })),
  deleteUser: id => set(state => ({ users: state.users.filter(user => user.id !== id) })),
  editUser: (id, data) => set(state => ({ users: state.users.map(user => user.id === id ? { ...user, ...data } : user) })),
  changeStatus: id => set(state => ({ users: state.users.map(user => user.id === id ? { ...user, status: !user.status } : user) }))
}))

export default useUserStore