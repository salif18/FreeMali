import React, { useContext } from 'react';
import OrderCard from '../cards/OrderCard';
import { MyStore } from '../../context/myStore';

const TableOrderComponent = () => {
    const { offres } = useContext(MyStore)
    return (
        <div className='tableauOrderComponent'>
            <h2>Offres liste</h2>
            <table className='table'>
              <thead>
              <tr className='ligne1'>
                  <th className='title'>Photo</th>
                  <th className='title'>Prenoms</th>
                  <th className='title'>Dates</th>
                  
              </tr>
              </thead>
              {offres.slice(0,5).map((item) =>(
                <tbody key={item._id}>
                 <OrderCard item={item}  />
              </tbody>
               ))
              }
              <tfoot></tfoot>
            </table>
        </div>
    );
}

export default TableOrderComponent;
