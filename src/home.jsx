import './home.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home(){
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const getData = async () => {
        try {
          const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
          setData(res.data);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Get current records
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div className='page'>
            <div className='box'>
                <div className='search-div'>
                    Search
                </div>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th className='checkbox-all'>
                                <input type='checkbox' className='check-all' />
                            </th>
                            <th>ID <span className='sorting-arrows'></span></th>
                            <th>NAME <span className='sorting-arrows'></span></th>
                            <th>DESCRIPTION <span className='sorting-arrows'></span></th>
                            <th>STATUS <span className='sorting-arrows'></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'row-color-1' : 'row-color-2'}>
                                <td className='checkbox'>
                                    <input type='checkbox' className='check-row' />
                                </td>
                                <td>{item.id}</td>
                                <td>{transformDescription(item.title)}</td>
                                <td>{transformDescription(item.body)}</td>
                                <td>{index % 2 === 0 ? 'Active' : 'Inactive'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='table-footer'>
                    <p className='active-customers'>ACTIVE IDs: {indexOfFirstRecord + 1}-{indexOfLastRecord} of {data.length}</p>
                    <div className='page-details'>
                        <span>Rows per page</span>
                        <select className='rows-dropdown' onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                        </select>
                        <p>{indexOfFirstRecord + 1}-{indexOfLastRecord} of {data.length}</p>
                    </div>
                    <div className='pagination'>
                        <button className='pagination-btn' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                        <button className='pagination-btn' onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRecord >= data.length}>&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function transformDescription(description) {
    const words = description.split(' ');
    const truncatedDescription = words.slice(0, 6).join(' ');
    return truncatedDescription + '...';
}
