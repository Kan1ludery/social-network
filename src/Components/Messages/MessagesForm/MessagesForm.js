import React from 'react';
import {Field, Form, Formik} from "formik";
import styles from "./MessagesForm.module.css";
import {useSelector} from "react-redux";

const MessagesForm = ({chatData, webSocket}) => {
    const {chatId, targetId} = chatData
    const {_id: currentUserId} = useSelector((state) => state.userReducer.user);
    return (
        <Formik
            initialValues={{message: ''}}
            onSubmit={(values, {resetForm}) => {
                if (webSocket && values.message) {
                    const messageData = {
                        targetId: targetId,
                        senderId: currentUserId,
                        chatId: chatId,
                        message: values.message,
                    };
                    console.log(webSocket)
                    webSocket.emit('message', messageData);
                }
                resetForm();
            }}>
            <Form>
                <div className={styles.container_Field}>
                    <Field
                        type="text"
                        name="message"
                        placeholder="Type a message..."
                        autoComplete="off"
                        className={styles.inputField}
                    />
                    <button type="submit" className={styles.sendMessageButton}></button>
                </div>
            </Form>
        </Formik>
    );
};

export default MessagesForm;