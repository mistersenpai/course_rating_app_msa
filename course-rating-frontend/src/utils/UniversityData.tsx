import * as React from 'react';
import { useEffect } from 'react';

const UniversityData: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5151/university');
        const data = await response.json();
        console.log(data)
        console.log('id:',data[0].departments.id)
        console.log('hello world')
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>University Data</h2>
    </div>
  );
};

export default UniversityData;
