import React, { useState } from 'react';
import styles from './AuthStyles';
import { Container, Content, Button, Icon, Text, H1, Form, Item, Input, Toast, Spinner } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useNavigationParam, useAsyncStorage } from 'react-navigation-hooks';
// import { AsyncStorage } from 'react-native';

export default function RegisterScreen() {
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

    function registerAction() {
        if (!validateForm()) {
            return;
        }
        // AsyncStorage.setItem('@login', 'Da Login');
        // AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
        setLoading(true);
        setTimeout(() => {
            navigate('IntroFirst');
            setLoading(false)
        }, 3000);

    }

    return (
        <KeyboardAwareScrollView innerRef={ref => { this.scroll = ref }}>
            {loading == true ? <Spinner style={styles.spinner} color='green' size="large" /> : null}
            <Container>
                <Content>
                    <H1 style={styles.textHeader}>Đăng Ký</H1>
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
                                autoCorrect={false}
                            />
                        </Item>
                        <Item last>
                            <Input
                                value={password}
                                onChangeText={password => { setPassword(password) }}
                                placeholder="Password"
                                returnKeyType="go"
                                secureTextEntry
                            />
                        </Item>
                        <Button dark
                            style={styles.buttonSignIn}
                            onPress={registerAction}
                        >
                            <Text style={[styles.textInButton, styles.paddingSignUp]}>ĐĂNG KÝ</Text>
                        </Button>
                    </Form>

                    <Button transparent light
                        style={styles.anotherPart}
                        onPress={() => {
                            navigate('Login');
                        }}
                    >
                        <Text style={[styles.textColorBlack]}>Đăng nhập</Text>
                    </Button>
                </Content>
            </Container>
        </KeyboardAwareScrollView>
    );
}

RegisterScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};
