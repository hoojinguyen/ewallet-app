import React, { useState } from 'react';
import { Container, Header, Content, Button, Icon, Text, H1, H2, H3, Form, Item, Input, Spinner, Toast } from 'native-base';
import styles from './AuthStyles';
import { StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import axios from "axios";
export default function LoginScreen() {
    const { navigate } = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function toastShow(error) {
        Toast.show({
            text: error,
            buttonText: "Okay",
            position: "top",
            type: "danger",
            duration: 3000
        })
    }

    function validateForm() {
        if (email === "") {
            toastShow("Email không được bỏ trống");
            return false;
        }
        if (password === "") {
            toastShow("Password không được bỏ trống");
            return false;
        }
        return true;
    }

    async function loginAction() {
        setLoading(true);

        if (!validateForm()) {
            return;
        }
        AsyncStorage.clear();
        axios.post(`http://10.0.2.2:3000/api/v1/users/login`,{
            username :email,
            password : password
        }).then(async res=>{
            console.log(res.data.token,"token")
            let userId = res.data.id;
            await AsyncStorage.setItem('token',res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            // setTimeout(()=>{
            //     axios.get(`http://10.0.2.2:3000/api/v1/users/${res.data.id}`).then(async res=>{
            //         console.log(res.data,"walletId")
            //         await AsyncStorage.setItem('walletId',res.data.walletId);
            //         navigate('IntroFirst');
            //         setLoading(false);
            //     })
            // },2000)
            axios.get(`http://10.0.2.2:3000/api/v1/wallets?userId=${res.data.id}`).then(async res=>{
                    if(res.data.items.length > 0)
                    {
                        await AsyncStorage.setItem('walletId',res.data.items[0].id);
                        navigate('Transaction');
                    }
                    else{
                        navigate('IntroFirst',{
                            userId : userId
                        });
                    }
                    setLoading(false);
                }).catch(error=>{
                    console.log(error)
                })
            
        }).catch(err=>{
            console.log(err)
            toastShow("Email hoặc Password không chính xác");
            setLoading(false)
            return;
        })

        // navigate('IntroFirst');
        
    }


    return (
        <KeyboardAwareScrollView
            innerRef={ref => {
                this.scroll = ref
            }}>
            {loading == true ? <Spinner style={styles.spinner} color='green' /> : null}
            <Container>
                <Content>
                    <H1 style={styles.textHeader}>Đăng Nhập</H1>
                    <Button iconLeft style={styles.buttonSignInWith} >
                        <Icon name='logo-facebook' />
                        <Text style={[styles.textInButton, styles.paddingFB]}>ĐĂNG NHẬP BẰNG FACEBOOK</Text>
                    </Button>
                    <Button danger iconLeft style={styles.buttonSignInWith} >
                        <Icon name='logo-googleplus' />
                        <Text style={[styles.textInButton, styles.paddingGG]}>ĐĂNG NHẬP BẰNG GOOGLE</Text>
                    </Button>
                    <Text style={styles.textOr}>HOẶC</Text>
                    <Form style={styles.formMargin}>
                        <Item>
                            <Input
                                value={email}
                                onChangeText={email => { setEmail(email) }}
                                placeholder="Email"
                                returnKeyType="next"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false} />
                        </Item>
                        <Item last>
                            <Input
                                value={password}
                                onChangeText={password => { setPassword(password) }}
                                placeholder="Password"
                                returnKeyType="go"
                                secureTextEntry />
                        </Item>
                        <Button
                            dark
                            style={styles.buttonSignIn}
                            onPress={loginAction}
                        >
                            <Text style={[styles.textInButton, styles.paddingSignUp]}>ĐĂNG NHẬP</Text>
                        </Button>
                    </Form>


                    <Grid style={styles.anotherPart}>
                        <Col>
                            <Button
                                transparent
                                light
                                onPress={() => {
                                    navigate('Register');
                                }}
                            >
                                <Text style={[styles.textColorBlack1]}>Đăng ký</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button transparent light>
                                <Text style={[styles.textColorBlack2]}>Quên mật khẩu?</Text>
                            </Button>
                        </Col>
                    </Grid>

                </Content>
            </Container>
        </KeyboardAwareScrollView>
    );

}

LoginScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};
