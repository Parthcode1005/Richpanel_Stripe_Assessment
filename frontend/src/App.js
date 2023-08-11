import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup"
import Dashboard from "./Pages/Dashboard";
import Payment from "./Pages/Payment";
import ActivePlan from './Pages/ActivePlan';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [duration, setDuration] = useState('monthly');
  const [plan, setPlan] = useState("basic");
  const [amount, setAmount] = useState(200);
  const [date, setDate] = useState('aj');

  useEffect(() => {
    console.log(amount);
  }, [amount])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/dashboard" element={
            <Dashboard user={user} plan={plan} setPlan={setPlan} duration={duration} setDuration={setDuration} amount={amount} setAmount={setAmount} date={date} setDate={setDate} />
          } exact />
          <Route path="/payment" element={<Payment user={user} amount={amount} plan={plan} duration={duration} date={date} setDate={setDate} />} exact />
          <Route path="/activeplan" element={<ActivePlan user={user} amount={amount} plan={plan} duration={duration} date={date} setAmount={setAmount} setPlan={setPlan} setDuration={setDuration} />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
