// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {details} = props

  return (
    <div className="coverage-cont">
      <h1 className="main-head">Vaccination By Gender</h1>
      <ResponsiveContainer width={700} height={400}>
        <PieChart>
          <Pie
            cx="50%"
            cy="70%"
            data={details}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByGender
