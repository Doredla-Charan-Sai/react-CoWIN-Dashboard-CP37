// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {details} = props

  return (
    <div className="coverage-cont">
      <h1 className="main-head">Vaccination By Age</h1>
      <ResponsiveContainer width={700} height={400}>
        <PieChart>
          <Pie
            cx="50%"
            cy="40%"
            data={details}
            startAngle={0}
            endAngle={360}
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge
