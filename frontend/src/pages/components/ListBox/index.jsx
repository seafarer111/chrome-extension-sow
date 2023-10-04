import React from "react";
import './styles.css'

const ListBox = (props) => {

    const handleClick = (e, person) => {
        if (e.target.tagName !== 'INPUT') {
            props.handleSelectPerson(person)
            e.stopPropagation();
        }
    }

    const handleChange = (e, person) => {
        props.handlePersonCheck(person, e.target.checked);
        e.stopPropagation();
    }

    return (
        <ul className="users-list">
            {
                props.persons.map((person, idx) => {
                    return <li onClick={(e) => handleClick(e, person)} className={`user-item ${props.selectedOne.name === person.name ? 'active' : ''}`} data-id="1" key={idx}><div className="d-felx">{person.name} <input type='checkbox' onChange={(e) => handleChange(e, person)} checked={person.matched} /> </div></li>
                })
            }
        </ul>
    )
}

export default ListBox;