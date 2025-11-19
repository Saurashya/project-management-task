import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const BudgetPieChart = ({ project }) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const data = [
        { name: 'Remaining', value: project.resources?.budget - project.resources?.spent  || 0 },
        { name: 'Spent', value: project.resources?.spent || 0 }
    ];

    const COLORS = ['#00C49F', '#FF8042'];

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    if (!project.resources?.budget && !project.resources?.spent) {
        return <p>No budget data available.</p>;
    }

    return (
        <PieChart width="100%" height={400}>
            <Pie
                activeIndex={activeIndex}
                data={data}
                dataKey="value"
                outerRadius="70%"
                fill="green"
                onMouseEnter={onPieEnter}
                style={{ cursor: 'pointer', outline: 'none' }}
                label={({ name, value }) => `${name}: Rs. ${value}`}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(value) => [`Rs. ${value}`, 'Amount']} />
        </PieChart>
    );
};

export default BudgetPieChart;
