import React from 'react';
import {Field, Form, Formik} from "formik";
import styles from "./MessagesForm.module.css";
import {setErrorMessage} from "../../../actions/usersActions";
import useCurrentUser from "../../../customHooks/useCurrentUser";

const MessagesForm = ({chatData, webSocket, dispatch}) => {
    const {chatId, targetId} = chatData
    const {currentUserId} = useCurrentUser()
    return (
        <Formik
            initialValues={{message: ''}}
            onSubmit={(values, {resetForm}) => {
                const trimmedMessage = values.message.trim();
                if (webSocket && trimmedMessage) {
                    const messageData = {
                        targetId: targetId,
                        senderId: currentUserId,
                        chatId: chatId,
                        message: values.message,
                    };
                    webSocket.emit('message', messageData);
                }
                resetForm();
                dispatch(setErrorMessage(null))
            }}>
            <Form>
                <div className={styles.container_Field}>
                    <Field
                        type="text"
                        name="message"
                        placeholder="Type a message..."
                        autoComplete="off"
                        className={styles.inputField}
                        maxLength={250}
                    />
                    <button type="submit" className={styles.sendMessageButton}></button>
                </div>
            </Form>
        </Formik>
    );
};

export default MessagesForm;