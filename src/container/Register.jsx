// import { Button } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import * as yup from 'yup';
import background from '../assets/img/delaney-van-unsplash.png';
import { DifferentPassword, ErrorUpdate, SuccessUpdate, UsedEmail } from "../components/notification/Toastify";
import { useShoppingCart } from "../context/ShoppingCartContext";
import useLocationForm from "../service/useLocationForm";
const Container = styled.div`
  width: full;
  min-height: 1000px;
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
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  height:auto;
`;

const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 0px 10px 0px 0px;
  padding: 10px;
  border:1px solid black;
`;
const Input1 = styled.input`
  flex: 1;
  min-width: 30%;
  margin-top:5px;
  padding: 10px;
  border:1px solid black;
`
const Input2 = styled.input`
  flex: 1;
  min-width: 70%;
  margin-top:5px;
  padding: 10px;
  border:1px solid black;
`
const Agreement = styled.span`
  font-size: 12px;
  // margin: 20px 0px;
  width: 100%;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Register = () => {
  var temp = false;
  const [loading, setLoading] = useState(temp);
  const { getAllItemQuantity } = useShoppingCart();
  function EnterLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 6000)
  }
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(true);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard
  } = state;
  function CheckAddress(value) {
    var validString = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]*$/;
    return (validString.test(value))
  }

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phoneNumber: '',
    },
    validationSchema: yup.object({
      userName: yup.string().max(40, "Kh??ng ???????c qu?? 40 k?? t???").required('C???n ph???i ??i???n'),
      email: yup.string().email('Email kh??ng h???p l???').required('Ch??a ??i???n th??ng tin email'),
      password: yup.string()
        .required('?? m???t kh???u ch??a ???????c ??i???n')
        .min(8, 'M???t kh???u qu?? ng???n, kh??ng ???????c ??t h??n 8 k?? t???'),
      confirmPassword: yup.string()
        .required('?? m???t kh???u ch??a ???????c ??i???n')
        .min(8, 'M???t kh???u qu?? ng???n, kh??ng ???????c ??t h??n 8 k?? t???'),
      phoneNumber: yup.string()
        .required('S??? ??i???n tho???i ch??a ???????c cung c???p')
        .min(9, "chi???u d??i ph???i l?? 9").max(9, "Ch??? c???n ??i???n 9 k?? t??? s???, kh??ng nh???p s??? 0 ??? ?????u"),
      address: yup.string().required("Nh???p ?????a ch??? s??? nh??").min(5, "C???n s??? nh?? v?? t??n ???????ng").max(100, "Nh???p qu?? s??? t??? cho ph??p")
    }),
    onSubmit: async values => {
      if (values.password !== values.confirmPassword) {
        DifferentPassword();
        return;
      }
      else {
        console.log("env", process.env.REACT_APP_TOKEN_CONFIRM)
        if (CheckAddress(values.address)) {
          const res = await axios({
            headers: {
              token: process.env.REACT_APP_TOKEN_CONFIRM
            },
            method: 'post',
            url: "http://localhost:1402/users/register", data: {
              userName: values.userName,
              email: values.email,
              password: values.password,
              phoneNumber: "0" + values.phoneNumber,
              address: values.address,
              cityId: selectedCity,
              districtId: selectedDistrict,
              wardId: selectedWard,
              addressId: selectedWard.value + "/" + selectedDistrict.value + "/" + selectedCity.value,
            }
          })
          const result = await res.data;
          if (!result.isAuth) {
            UsedEmail();
            return;
          }
          else {
            const d = new Date();
            d.setTime(d.getTime() + (3 * 24 * 60 * 60 * 1000))
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("username", values.userName);
            localStorage.setItem("addressId", selectedWard.value + "/" + selectedDistrict.value + "/" + selectedCity.value);
            SuccessUpdate("????ng k?? th??nh c??ng, ch??? 3 gi??y ????? chuy???n h?????ng ?????n trang ng?????i d??ng")
            // document.cookie = " userName=" + result.userName + ";expires=" + d + ";path=/";
            formik.resetForm();
            setTimeout(() => {
              window.location.replace("/");
              // HandleToastRegister(result.message, values.userName);
            }, 3000);
          }
        }
        else {
          ErrorUpdate("?????a ch??? ch??? nh?? v?? ???????ng bao g???m s??? v?? k?? t??? v?? kho???ng tr???ng")
        }
      }
    }
  },
  );
  return (
    <Container>
      <Wrapper>
        <Title>T???o t??i kho???n</Title>
        <Form onSubmit={formik.handleSubmit}>
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>T??n ng?????i d??ng</label>
          <Input placeholder="username" type="text" name="userName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} val required />
          {formik.touched.userName && formik.errors.userName ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.userName}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          <label style={{ height: "25px", fontWeight: "700" }}>Email</label>
          <Input placeholder="email" type='email' name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} required />
          {formik.touched.email && formik.errors.email ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.email}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>M???t kh???u</label>
          <Input placeholder="password" type='password' name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} required />
          {formik.touched.password && formik.errors.password ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.password}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Nh???p l???i m???t kh???u</label>
          <Input placeholder="confirm password" type='password' name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} required />
          <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>
          {/* {formik.values.password !== formik.values.confirmPassword ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>M???t kh???u x??c nh???n kh??ng gi???ng v???i m???t kh???u nh???p v??o</div> : null} */}
          < label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}> Nh???p s??? ??i???n tho???i</label>
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            <Input1 value="(+84)" type="text" disabled />
            <Input2 placeholder="111122223" type="text" name="phoneNumber" onChange={formik.handleChange} value={formik.values.phoneNumber} onBlur={formik.handleBlur} />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.phoneNumber}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          < label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}> ?????a ch???</label>
          <div className="flex flex-col gap-2 w-full">
            <label>Th??nh Ph???</label>
            <Select
              name="cityId"
              key={`cityId_${selectedCity?.value}`}
              isDisabled={cityOptions.length === 0}
              options={cityOptions}
              onChange={(option) => onCitySelect(option)}
              placeholder="T???nh/Th??nh"
              defaultValue={selectedCity}
            />
            <label>Ph?????ng/ Huy???n</label>
            <Select
              name="districtId"
              key={`districtId_${selectedDistrict?.value}`}
              isDisabled={districtOptions.length === 0}
              options={districtOptions}
              onChange={(option) => onDistrictSelect(option)}
              placeholder="Qu???n/Huy???n"
              defaultValue={selectedDistrict}
            />
            <label>X??/Th??? Tr???n/ ???p</label>
            <Select
              name="wardId"
              key={`wardId_${selectedWard?.value}`}
              isDisabled={wardOptions.length === 0}
              options={wardOptions}
              placeholder="Ph?????ng/X??"
              onChange={(option) => onWardSelect(option)}
              defaultValue={selectedWard}
            />
            <label>S??? nh?? v?? ???????ng</label>
            <Input name="address" type="text" onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} placeholder="?????a ch??? nh?? v?? ???????ng" />
            {formik.touched.address && formik.errors.address ? <div style={{ width: "100%", color: 'red', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.address}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          </div>
          <Agreement>
            B???ng vi???c t???o t??i kho???n b???n ???? ?????ng ?? c??c ??i???u kho???n c???a ch??ng t??i <b>??i???u kho???n</b>
          </Agreement>
          <Button type="submit" className="w-[2/5] border-none py-[15px] px-[20px] bg-teal-600 decoration-white cursor-pointer h-auto" >T???o t??i kho???n</Button>
        </Form>
        <Link href="/login">???? c?? t??i kho???n?</Link>
        <Link href="/">Quay tr??? l???i trang mua h??ng</Link>
      </Wrapper>
      <ToastContainer />
    </Container >
  );
};

export default Register;
