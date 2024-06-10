import React, { useEffect, useState } from "react";
import { boardServer } from "../../services";
const classie = require('classie');

const Message = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [words, setWords] = useState('');

    const handleSubmit = async () => {
        if (!name || !email || !words) {
            alert('All fields must be filled!');
            return;
        }
        const data = { name, email, words };
        try {
            await boardServer.sendMessage(data);
            alert('Message sent successfully!');
        } catch (error) {
            alert('Failed to send message!');
        }
    }
    useEffect(() => {
        const inputs = Array.from(document.querySelectorAll('input.input__field'));
        const onInputFocus = ev => {
            classie.add(ev.target.parentNode, 'input--filled');
        }
        const onInputBlur = ev => {
            if (ev.target.value.trim() === '') {
                classie.remove(ev.target.parentNode, 'input--filled');
            }
        }
        inputs.forEach(inputEl => {
            if (inputEl.value.trim() !== '') {
                classie.add(inputEl.parentNode, 'input--filled');
            }
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);
        });
        return () => {
            inputs.forEach(inputEl => {
                inputEl.removeEventListener('focus', onInputFocus);
                inputEl.removeEventListener('blur', onInputBlur);
            });
        }
    }, []);
    return (
        <div className="board-message  bgcolor-4">
            <span className="input input--haruki">
                <input className="input__field input__field--haruki" type="text" id="input-1" value={name} onChange={e => setName(e.target.value)} />
                <label className="input__label input__label--haruki" htmlFor="input-1">
                    <span className="input__label-content input__label-content--haruki">Name</span>
                </label>
            </span>
            <span className="input input--haruki">
                <input className="input__field input__field--haruki" type="text" id="input-2" value={email} onChange={e => setEmail(e.target.value)} />
                <label className="input__label input__label--haruki" htmlFor="input-2">
                    <span className="input__label-content input__label-content--haruki">Email</span>
                </label>
            </span>
            <span className="input input--haruki">
                <input className="input__field input__field--haruki" type="text" id="input-3" value={words} onChange={e => setWords(e.target.value)} />
                <label className="input__label input__label--haruki" htmlFor="input-3">
                    <span className="input__label-content input__label-content--haruki">Words</span>
                </label>
            </span>
            <button id="sendMessage" className="button button--dione" onClick={handleSubmit}><span>Send</span></button>
        </div>
    );
}

export default Message;