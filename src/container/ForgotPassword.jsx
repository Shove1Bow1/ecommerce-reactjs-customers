import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import background from '../assets/img/delaney-van-unsplash.png';
import { CorrectRecoverEmail, DifferentPassword, SuccessUpdate, WrongRecoverEmail } from "../components/notification/Toastify";
const Container = styled.div`
  width: full;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${background})
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border:1px solid black;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Select = styled.select`

`
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ForgotPassword = (props) => {
    // var [getCheckbox, setCheckbox] = useState(0);
    var [getRecoverForm, setRecoverForm] = useState(false);
    var [getId, setId] = useState("");
    var getLocation = useLocation();
    var valueCode = getLocation.pathname.toString().split("/");
    var endCode = valueCode[valueCode.length - 2];
    var userId = valueCode[valueCode.length - 1]
    console.log(endCode);
    // async function ChangeForm(value) {
    //     const res = await axios({
    //         url: "http://localhost:1402/users/check_code",
    //         method: "get",
    //         headers: {
    //             token: process.env.REACT_APP_TOKEN_CONFIRM,
    //             recover_code: value,
    //         }
    //     })
    //     const data = await res.data;
    //     return data.isAuth;
    // }  

    useEffect(() => {
        if (props.isRecover) {
            setRecoverForm(true);
        }
    }, [])

    // const formik = useFormik({
    //     initialValues: {
    //         userEmail: '',
    //         secretCode: '',
    //     },
    //     validationSchema: yup.object({
    //         userEmail: yup.string().max(40, "must be 40 characters or less").required('Required'),
    //         secretCode: yup.string().max(50, "must be 50 characters or less").required('Required')
    //     }),
    //     onSubmit: async values => {
    //         const res = await axios({
    //             method: 'post',
    //             url: 'http://localhost:1402/users/recover',
    //             headers: {
    //                 token: process.env.REACT_APP_TOKEN_CONFIRM
    //             },
    //             data: {
    //                 email: values.userEmail,
    //                 secretCode: values.secretCode
    //             }
    //         })
    //         const result = res.data;
    //         setRecoverForm(result.message)
    //         setId(result.idUser);
    //         alert(result.status);
    //     }
    // },
    // );
    // const recoverPasswordFormik = useFormik({
    //     initialValues: {
    //         newPassword: '',
    //         confirmPassword: '',
    //     },
    //     validationSchema: yup.object({
    //         newPassword: yup.string().max(40, "must be 40 characters or less").min(8, "must be 40 characters or more").required('Required'),
    //         confirmPassword: yup.string().max(40, "must be 40 characters or less").min(8, "must be 40 characters or more").required('Required'),
    //     }),
    //     onSubmit: async values => {
    //         console.log(true);
    //         if (values.confirmPassword === values.newPassword) {
    //             const res = await axios({
    //                 method: 'post',
    //                 url: 'http://localhost:1402/users/forgot_password',
    //                 headers: {
    //                     token: process.env.REACT_APP_TOKEN_CONFIRM
    //                 },
    //                 data: {
    //                     uuid: getId,
    //                     newPassword: values.newPassword
    //                 }
    //             })
    //             const result = res.data;
    //             alert(result.status)
    //         }
    //         else
    //             alert("re enter your password");
    //     }
    // },);
    function ShowPage() {
        const formik = useFormik({
            initialValues: {
                userEmail: '',
                // secretCode: '',
            },
            validationSchema: yup.object({
                userEmail: yup.string().email("Ch??a ????ng ?????nh d???ng email").required('Required'),
                // secretCode: yup.string().max(50, "must be 50 characters or less").required('Required')
            }),
            onSubmit: async values => {
                const res = await axios({
                    method: 'post',
                    url: 'http://localhost:1402/users/recover_email',
                    headers: {
                        token: process.env.REACT_APP_TOKEN_CONFIRM
                    },
                    data: {
                        email: values.userEmail
                    }
                })
                const result = res.data;
                if (result.isAuth) {
                    // console.log(result);
                    // setRecoverForm(result.message)
                    // setId(result.idUser);
                    values.userEmail = '';
                    CorrectRecoverEmail();

                }
                else {
                    WrongRecoverEmail();
                }
            }
        },
        );
        const recoverPasswordFormik = useFormik({
            initialValues: {
                newPassword: '',
                confirmPassword: '',
            },
            validationSchema: yup.object({
                newPassword: yup.string().max(40, "must be 40 characters or less").min(8, "must be 40 characters or more").required('Required'),
                confirmPassword: yup.string().max(40, "must be 40 characters or less").min(8, "must be 40 characters or more").required('Required'),
            }),
            onSubmit: async values => {
                if (values.confirmPassword === values.newPassword) {
                    const res = await axios({
                        method: 'post',
                        url: 'http://localhost:1402/users/forgot_password',
                        headers: {
                            token: process.env.REACT_APP_TOKEN_CONFIRM
                        },
                        data: {
                            recoverCode: endCode,
                            newPassword: values.newPassword,
                            userId: userId,
                        }
                    })
                    const result = res.data;
                    if (result.isUpdate) {
                        SuccessUpdate("C???p nh???t m???t kh???u th??nh c??ng, chuy???n h?????ng ?????n trang ????ng nh???p");
                        setTimeout(() => {
                            window.location.replace("/Login");
                        }, 3000)

                    }
                    else {
                        toast.error("y??u c???u qu?? th???i gian nh???p", { position: toast.POSITION.BOTTOM_LEFT })
                    }
                }
                else
                    DifferentPassword();
            }
        },);
        if (!getRecoverForm) {
            return (
                <Form onSubmit={formik.handleSubmit}>
                    <label>Email</label>
                    <Input placeholder="example@mail" name="userEmail" type="email" onChange={formik.handleChange} minLength="3" onBlur={formik.handleBlur} value={formik.values.userEmail} required />
                    {/* <label>M?? ph???c h???i</label>
                    <Input placeholder="xyd12" name="secretCode" type="text" onChange={formik.handleChange} minLength="5" onBlur={formik.handleBlur} value={formik.values.secretCode} required /> */}
                    <Button type="submit">X??c Th???c</Button>
                    <Link href="/login">Quay tr??? l???i vi???c ????ng nh???p</Link>
                    <Link href="/register">T???o t??i kho???n m???i</Link>
                    <Link href="/">Quay tr??? l???i trang mua h??ng</Link>
                </Form>
            )
        }
        else {
            return (
                <Form onSubmit={recoverPasswordFormik.handleSubmit}>
                    <label>M???t kh???u m???i</label>
                    <Input placeholder="*****" name="newPassword" type="password" onChange={recoverPasswordFormik.handleChange} minLength="8" onBlur={recoverPasswordFormik.handleBlur} value={recoverPasswordFormik.values.newPassword} required />
                    {recoverPasswordFormik.touched.newPassword && recoverPasswordFormik.errors.newPassword ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.newPassword}</div> : <div style={{ width: "100%", color: 'red', marginBottom: "5px", minHeight: "15px" }}></div>}
                    <label>Nh???p l???i m???t kh???u m???i</label>
                    <Input placeholder="*****" name="confirmPassword" type="password" onChange={recoverPasswordFormik.handleChange} minLength="8" onBlur={recoverPasswordFormik.handleBlur} value={recoverPasswordFormik.values.confirmPassword} required />
                    <Button type="submit">Thay ?????i m???t kh???u</Button>
                </Form>
            )
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>Qu??n m???t kh???u?</Title>
                {/* <div className="flex flex-row">
                    <label>
                        <input type="checkbox" className="radio" value="1" onChange={(e) => setCheckbox(1)} checked={getCheckbox === 1 ? true : false} />Email k??m m?? ph???c h???i
                    </label>
                    <label>
                        <input type="checkbox" className="radio" value="2" onChange={(e) => setCheckbox(2)} checked={getCheckbox === 2 ? true : false} />Email k??m m?? OTP
                    </label>
                </div> */}
                {/* {getCheckbox === 1 ?{
                    !getRecoverForm ?
                        <Form onSubmit={formik.handleSubmit}>
                            <label>Email</label>
                            <Input placeholder="example@mail" name="userEmail" type="email" onChange={formik.handleChange} minLength="3" onBlur={formik.handleBlur} value={formik.values.userName} required />
                            <label>M?? ph???c h???i</label>
                            <Input placeholder="xyd12" name="secretCode" type="text" onChange={formik.handleChange} minLength="5" onBlur={formik.handleBlur} value={formik.values.secretCode} required />
                            <Button type="submit">X??c Th???c</Button>
                            <Link href="/login">Quay tr??? l???i vi???c ????ng nh???p</Link>
                            <Link href="/register">T???o t??i kho???n m???i</Link>
                        </Form>
                        :
                        <Form onSubmit={recoverPasswordFormik.handleSubmit}>
                            <label>M???t kh???u m???i</label>
                            <Input placeholder="*****" name="newPassword" type="password" onChange={recoverPasswordFormik.handleChange} minLength="8" onBlur={recoverPasswordFormik.handleBlur} value={recoverPasswordFormik.values.newPassword} required />
                            {recoverPasswordFormik.touched.newPassword && recoverPasswordFormik.errors.newPassword ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.newPassword}</div> : null}
                            <label>Nh???p l???i m???t kh???u m???i</label>
                            <Input placeholder="*****" name="confirmPassword" type="password" onChange={recoverPasswordFormik.handleChange} minLength="8" onBlur={recoverPasswordFormik.handleBlur} value={recoverPasswordFormik.values.confirmPassword} required />
                            {recoverPasswordFormik.touched.confirmPassword && recoverPasswordFormik.errors.confirmPassword ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.confirmPassword}</div> : null}
                            <Button type="submit">Thay ?????i m???t kh???u</Button>
                        </Form>
                } */}
                <ShowPage />
                {/* : */}
                {/* <OtpLayout /> */}
                {/* } */}
            </Wrapper>
            <ToastContainer />
        </Container>
    )
}
const OtpLayout = () => {
    const formik = useFormik({
        initialValues: {
            userEmail: '',
        },
        validationSchema: yup.object({
            userEmail: yup.string().max(40, "must be 40 characters or less").required('Required'),
        }),
        onSubmit: async values => {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:1402/users/get_otp',
                headers: {
                    token: process.env.REACT_APP_TOKEN_CONFIRM
                },
                data: {
                    email: values.userEmail,
                }
            })
            const result = res.data;
            alert(result.message);
        }
    },
    );
    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <label>Email</label>
                <Input placeholder="example@mail" name="userEmail" onChange={formik.handleChange} minLength="3" onBlur={formik.handleBlur} value={formik.values.userName} required />
                <Button type="submit">X??c Th???c Email</Button>
            </Form>
        </>

    )
}
export default ForgotPassword;