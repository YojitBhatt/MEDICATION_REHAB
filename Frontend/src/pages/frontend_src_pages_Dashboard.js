import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [medications, setMedications] = useState([]);
  const [rehab, setRehab] = useState([]);
  const [medForm, setMedForm] = useState({ name: "", dosage: "", time: "", notes: "" });
  const [rehabForm, setRehabForm] = useState({ activity: "", scheduledTime: "", notes: "" });

  // Fetch profile, medications, rehab
  useEffect(() => {
    api.getProfile(token).then(res => setProfile(res.data));
    api.getMedications(token).then(res => setMedications(res.data));
    api.getRehab(token).then(res => setRehab(res.data));
  }, [token]);

  // Add Medication
  const addMedication = async (e) => {
    e.preventDefault();
    const res = await api.addMedication(token, medForm);
    setMedications(meds => [...meds, res.data]);
    setMedForm({ name: "", dosage: "", time: "", notes: "" });
  };

  // Delete Medication
  const deleteMedication = async (id) => {
    await api.deleteMedication(token, id);
    setMedications(meds => meds.filter(m => m._id !== id));
  };

  // Add Rehab Activity
  const addRehab = async (e) => {
    e.preventDefault();
    const res = await api.addRehab(token, rehabForm);
    setRehab(list => [...list, res.data]);
    setRehabForm({ activity: "", scheduledTime: "", notes: "" });
  };

  // Delete Rehab Activity
  const deleteRehab = async (id) => {
    await api.deleteRehab(token, id);
    setRehab(list => list.filter(r => r._id !== id));
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <h3>Welcome, {profile.name}</h3>

      <div style={{ display: "flex", gap: 40 }}>
        {/* Medications */}
        <div>
          <h4>Medications</h4>
          <form onSubmit={addMedication}>
            <input placeholder="Name" required value={medForm.name} onChange={e => setMedForm(f => ({ ...f, name: e.target.value }))} />
            <input placeholder="Dosage" value={medForm.dosage} onChange={e => setMedForm(f => ({ ...f, dosage: e.target.value }))} />
            <input placeholder="Time" value={medForm.time} onChange={e => setMedForm(f => ({ ...f, time: e.target.value }))} />
            <input placeholder="Notes" value={medForm.notes} onChange={e => setMedForm(f => ({ ...f, notes: e.target.value }))} />
            <button>Add Medication</button>
          </form>
          <ul>
            {medications.map(m => (
              <li key={m._id}>{m.name} - {m.dosage} at {m.time}
                <button onClick={() => deleteMedication(m._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Rehab */}
        <div>
          <h4>Rehab Activities</h4>
          <form onSubmit={addRehab}>
            <input placeholder="Activity" required value={rehabForm.activity} onChange={e => setRehabForm(f => ({ ...f, activity: e.target.value }))} />
            <input placeholder="Scheduled Time" value={rehabForm.scheduledTime} onChange={e => setRehabForm(f => ({ ...f, scheduledTime: e.target.value }))} />
            <input placeholder="Notes" value={rehabForm.notes} onChange={e => setRehabForm(f => ({ ...f, notes: e.target.value }))} />
            <button>Add Activity</button>
          </form>
          <ul>
            {rehab.map(r => (
              <li key={r._id}>{r.activity} at {r.scheduledTime}
                <button onClick={() => deleteRehab(r._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}