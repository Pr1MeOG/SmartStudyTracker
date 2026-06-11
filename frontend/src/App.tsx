import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Classes from './pages/Classes'
import Announcements from './pages/Announcements'
import Fees from './pages/Fees'
import Subjects from './pages/Subjects'
import Sessions from './pages/Sessions'
import Homework from './pages/Homework'
import Attendance from './pages/Attendance'
import Tests from './pages/Tests'
import Revisions from './pages/Revisions'
import Goals from './pages/Goals'
import Analytics from './pages/Analytics'
import Streaks from './pages/Streaks'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Essential from './pages/Essential'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/revisions" element={<Revisions />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/essential" element={<Essential />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AppShell>
  )
}
