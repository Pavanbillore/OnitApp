import { StyleSheet, Text, View ,ScrollView,Image,Linking} from 'react-native'
import React from 'react'

const AboutUs = () => {
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop:  30,
                    backgroundColor: "#E5E7E9"
                }}>
                
                <View
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={require('../../assets/image/logo.png')}
                        style={{
                            width: '100%',
                            height: 60,
                            resizeMode: 'contain',
                            marginVertical: 20,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: 'poppins-semibold',
                            fontWeight: 'bold',
                            fontSize: 22,
                            color:"black"
                        }}>
                        About{' '}
                        <Text style={{ color: '#00796A', fontWeight: 'bold' }}>
                            Onit.services{'\n'}
                        </Text>
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'poppins-semibold',
                            fontWeight: 'bold',
                            fontSize: 16,
                            textAlign: 'justify',
                            color:"black"
                        }}>
                        Onit.services is a leading service platform that connects customers
                        with top-quality service providers for a range of services, including
                        home cleaning, plumbing, and electrical, carpentry, AC, grooming
                        services and many more. Our mission is to provide our customers with
                        the best possible service experience, while also helping our service
                        providers grow their businesses and succeed. We have created an
                        easy-to-use platform that allows you to book services with just a few
                        clicks. Our platform features a wide range of services, and we only
                        work with the best service providers in the industry, ensuring that
                        you receive top-quality service every time. At Onit.services, we are
                        committed to providing our customers with an exceptional service
                        experience. Our service providers are carefully vetted and undergo a
                        rigorous screening process to ensure that they meet our high standards
                        for quality and professionalism. We also offer a satisfaction
                        guarantee, so if you're not happy with the service you receive, we'll
                        work with you to make it right. For service providers, we offer a
                        platform that allows you to showcase your skills and grow your
                        business. By joining our platform, you'll have access to a large pool
                        of potential customers. This platform will give you liberty to grow
                        and develop your business independently just using your own QR.
                        Whether you're a customer looking for top-quality services or a
                        service provider looking to grow your business, Onit.services is the
                        perfect solution. Contact us today to learn more about our platform
                        and how we can help you.
                        {'\n'}
                        {'\n'}Learn more on:{'\n'}
                        <Text
                            style={{ color: '#00796A', textDecorationLine: 'underline' }}
                            onPress={() => Linking.openURL('https://www.onit.services/')}>
                            https://www.onit.services{'\n'}
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default AboutUs

const styles = StyleSheet.create({})