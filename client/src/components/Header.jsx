import React from 'react'
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";


const Header = ({ setSearch }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/"> Customer Feedback Portal</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        {userInfo && (
                            <Form inline>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form>
                        )}
                    </Nav>
                    <Nav>
                        {userInfo ? (
                            <>
                                <Nav.Link href="/myfeedbacks">My Feedbacks</Nav.Link>
                                <NavDropdown
                                    title={`${userInfo.name}`}
                                    id="collasible-nav-dropdown"
                                >
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;