import React, { useEffect } from 'react';

interface Department {
  id: number;
  name: string;
  universityId: number;
}

interface DepartmentDataProps {
  onDataFetched: (departments: Department[]) => void;
}

const DepartmentData: React.FC<DepartmentDataProps> = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5151/Department');
        const data = await response.json();
        console.log(data)
        onDataFetched(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataFetched]);

  return null;
};

export default DepartmentData;
