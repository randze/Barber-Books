import React, { useState, useEffect } from 'react'

import API from "../utils/API"

import { Table } from 'react-bootstrap'

function ListAppointments(props) {
    let [info, setInfo] = useState([])
    // Load info on all appointments and store them with setBooks (first load)
    useEffect(() => {
        loadInfo()
    }, [])

    // Load info of all appointments and sets them to info
    async function loadInfo() {
        try {
            let result = await API.getInfo()
            setInfo(result.data)
        } catch (err) { console.log(err) }
    };
    console.log(info)
    return (<>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Appointments</th>
                </tr>
            </thead>
            <tbody>
                {info.map(item =>
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>appointments</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>)
}

export default ListAppointments