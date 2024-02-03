import '../styles/Reports.css';

function Reports(){
    return(
        <>
        <div className='reports'>
        <table className='table' style={{borderRadius: '10px'}}>
          <thead className='table-head'>
            <tr>
              <th>Personal report</th>
              <th>Reported ad</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            
              <tr className='item-wrapper'>
                <td className='slika-podaci'>
                  <div className='personal-info' style={{ fontWeight: 'bold' }}>
                    <p>Username: </p>
                    <p>Email: </p>
                    <p>First name: </p>
                    <p>Last name: </p>
                  </div>
                </td>
                <td>
                  <img></img>
                </td>
                <td className='prvi'>
                  <button className='signInButton' type="submit" >Schedule</button>
                </td>
              </tr>
          </tbody>
        </table>
        </div>
        </>
    )
}

export default Reports;