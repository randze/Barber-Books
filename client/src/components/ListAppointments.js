import React, { useState, useEffect } from 'react'

import API from "../utils/API"

import moment from 'moment'

import { Table } from 'react-bootstrap'

const format = 'YYYY-MM-DD hh:mm a'

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

    let renderTime = item => moment(item, 'YYYY-MM-DDThh:mm:ss.SSSZ').format('dddd, MMMM Do YYYY, h:mm a')
    console.log(info[1] ? renderTime(info[1].appointments[0].time) : '')
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
                        <td><ul>{item.appointments[0] ? item.appointments.map(jtem =>
                            <li>{renderTime(jtem.time)}</li>
                        ) : 'None'}</ul></td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>)
}

export default ListAppointments