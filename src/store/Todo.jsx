import { useState } from 'react'
import useUserStore from '../store/useUserStore'

const Todo = () => {
  const { users, addUser, deleteUser, editUser, changeStatus } = useUserStore()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [form, setForm] = useState({ name: '', age: '' })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || (filter === 'active' ? user.status : !user.status)
    return matchesSearch && matchesFilter
  })

  const openAdd = () => {
    setForm({ name: '', age: '' })
    setSelectedUser(null)
    setModal('add')
  }

  const openEdit = user => {
    setSelectedUser(user)
    setForm({ name: user.name, age: user.age })
    setModal('edit')
  }

  const openInfo = user => {
    setSelectedUser(user)
    setModal('info')
  }

  const closeModal = () => {
    setModal('')
    setSelectedUser(null)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!form.name.trim() || !form.age) return

    if (modal === 'add') {
      addUser({ id: Date.now(), name: form.name, age: Number(form.age), status: true })
    }

    if (modal === 'edit') {
      editUser(selectedUser.id, { name: form.name, age: Number(form.age) })
    }

    closeModal()
  }

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <button onClick={openAdd} className="rounded-lg bg-black px-4 py-2 text-white">Add User</button>
        </div>

        <div className="mb-6 flex gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search user..." className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none" />
          <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 outline-none">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {filteredUsers.map(user => (
            <div key={user.id} className="rounded-xl border border-gray-300 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <input type="checkbox" checked={user.status} onChange={() => changeStatus(user.id)} />
              </div>

              <p className="mb-3 text-sm">Age: {user.age}</p>
              <p className="mb-4 text-sm">Status: {user.status ? 'Active' : 'Inactive'}</p>

              <div className="flex gap-2">
                <button onClick={() => openInfo(user)} className="rounded-md border border-black px-3 py-1">Info</button>
                <button onClick={() => openEdit(user)} className="rounded-md border border-black px-3 py-1">Edit</button>
                <button onClick={() => deleteUser(user.id)} className="rounded-md bg-black px-3 py-1 text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && <p className="mt-6 text-center">Users not found</p>}
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 text-black">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {modal === 'add' ? 'Add User' : modal === 'edit' ? 'Edit User' : 'User Info'}
              </h2>
              <button onClick={closeModal} className="text-xl">×</button>
            </div>

            {modal === 'info' ? (
              <div className="space-y-3">
                <p>Name: {selectedUser.name}</p>
                <p>Age: {selectedUser.age}</p>
                <p>Status: {selectedUser.status ? 'Active' : 'Inactive'}</p>
                <button onClick={closeModal} className="w-full rounded-lg bg-black py-2 text-white">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none" />
                <input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="Age" className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none" />
                <button type="submit" className="w-full rounded-lg bg-black py-2 text-white">
                  {modal === 'add' ? 'Add' : 'Save'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Todo