import React from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

const AddMemberModal = props => {
    return (
        <Modal isOpen={props.modalOpen} toggle={props.toggleModal} className={props.className}>
            <ModalHeader toggle={props.toggleModal}>Add New Team Member</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="usertName">User Name or Email</Label>
                        <Input
                            type="text"
                            name="usernameinput"
                            id="userName"
                            placeholder="Agility"
                            onChange={props.onNewName}
                        />
                        <Label for="role">Role</Label>

                        <Input
                            type="select"
                            name="role"
                            id="role"
                            defaultValue="TeamMember"
                            onChange={props.onNewRole}
                        >
                            <option value="TeamMember">Project Member</option>
                            <option value="ProjectManager">Project Manager</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleModal}>
                    Cancel
                </Button>
                <Button color="primary" onClick={props.onAddMember}>
                    Add
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddMemberModal;
