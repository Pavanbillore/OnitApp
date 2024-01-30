import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

const Privacy = () => {
    return (
        <View
            style={{
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                padding: 15,
                flex:1
            }}>
            <ScrollView>
                <Text
                    style={{
                        fontFamily: 'poppins-semibold',
                        fontWeight: 'bold',
                        fontSize: 28,
                        marginBottom: 24,
                        color: 'black'
                    }}>
                    Privacy <Text style={{ color: '#00796A' }}>Policy</Text>
                </Text>
                <Text style={styles.contentText}>
                    At Onit, we value your privacy and are committed to protecting your
                    personal information. This Privacy Policy explains how we collect,
                    use, and disclose information about you when you use our service
                    platform.{' '}
                </Text>
                <View>
                    <Text style={styles.labelText}>1. Information we collect</Text>
                    <Text style={styles.contentText}>
                        When you use our service platform, we may collect the following
                        types of information:
                    </Text>
                    <Text style={styles.contentText}>
                        <Text style={styles.labelText3}>Personal information:</Text>
                        {'\n'} We may collect personal information that you provide to us,
                        such as your name, email address, phone number, and billing
                        information. {'\n'}
                        {'\n'}
                        <Text style={styles.labelText3}>Usage information:</Text>
                        {'\n'} We may collect information about how you use our service
                        platform, including your IP address, browser type, pages you view,
                        and other usage data.{'\n'}
                        {'\n'}
                        <Text style={styles.labelText3}>
                            {' '}
                            Cookies and similar technologies:
                        </Text>
                        {'\n'} We may use cookies and similar technologies to collect
                        information about your use of our service platform and to deliver
                        personalized content.
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>2. How we use your information</Text>
                    <Text style={styles.contentText}>
                        We may use the information we collect for the following purposes:
                        {'\n'}
                        {'\n'}
                        <Text style={styles.labelText3}>
                            {' '}
                            To provide our service platform:
                        </Text>
                        {'\n'} We may use your information to provide you with access to our
                        service platform and to improve our services.
                        {'\n'}
                        {'\n'}
                        <Text style={styles.labelText3}> To communicate with you:</Text>
                        {'\n'} We may use your information to communicate with you about our
                        service platform, including updates and promotions.
                        {'\n'}
                        {'\n'}
                        <Text style={styles.labelText3}>
                            {' '}
                            To personalize your experience:
                        </Text>
                        {'\n'} We may use your information to deliver personalized content
                        and recommendations based on your preferences.
                        {'\n'}
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>3. How we share your information</Text>
                    <Text style={styles.contentText}>
                        We may share your information with third parties in the following
                        circumstances:
                        {'\n'}
                        {'\n'}
                        <Text style={styles.labelText3}> Service providers:</Text>
                        {'\n'} We may share your information with service providers that
                        help us operate our service platform, such as hosting providers and
                        payment processors.
                        {'\n'}
                        {'\n'}
                        <Text style={styles.labelText3}> Business partners:</Text>
                        {'\n'} We may share your information with business partners that
                        provide complementary services to our service platform
                        {'\n'}
                        {'\n'}
                        <Text style={styles.labelText3}> Legal purposes:</Text>
                        {'\n'} We may disclose your information in response to legal
                        requests, court orders, or to protect our rights and property.
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>4. Data retention</Text>
                    <Text style={styles.contentText}>
                        We will retain your information for as long as necessary to provide
                        you with our service platform and to comply with our legal
                        obligations.{'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>5. Your rights</Text>
                    <Text style={styles.contentText}>
                        You have certain rights with respect to your personal information,
                        including the right to access, correct, and delete your information.
                        You may also have the right to object to certain types of processing
                        or to withdraw your consent. To exercise your rights, please contact
                        us using the contact information provided below{'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>6. Security</Text>
                    <Text style={styles.contentText}>
                        We take reasonable measures to protect your personal information
                        from unauthorized access, use, and disclosure.{'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>
                        7. Changes to this Privacy Policy
                    </Text>
                    <Text style={styles.contentText}>
                        We may update this Privacy Policy from time to time to reflect
                        changes in our practices or to comply with legal requirements. If we
                        make significant changes, we will provide you with notice by email
                        or by posting a notice on our service platform.{'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>8. Contact us</Text>
                    <Text style={styles.contentText}>
                        If you have any questions or concerns about this Privacy Policy or
                        our practices, please contact us at{' '}
                        <Text style={styles.labelText3}> help@onit.services{'\n'}</Text>
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Restrictions</Text>
                    <Text style={styles.contentText}>
                        You are specifically restricted from all of the following actions:
                        Publishing any website material (OniT) in any other media; Selling,
                        sublicensing and/or otherwise commercializing any Website material;
                        Publicly performing and/or showing any website material; Using this
                        Website in any way that is or may be damaging to this Website; Using
                        this Website in any way that impacts user access to this Website;
                        Using this Website contrary to applicable laws and regulations, or
                        in any way may cause harm to the Website, or to any person or
                        business entity; Engaging in any data mining, data harvesting, data
                        extracting or any other similar activity in relation to this
                        Website; Using this Website to engage in any advertising or
                        marketing. Certain areas of this Website are restricted from being
                        access by you and Company Name may further restrict access by you to
                        any areas of this Website, at any time, in absolute discretion. Any
                        user ID and password you may have for this Website are confidential
                        and you must maintain confidentiality as well
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Your Content</Text>
                    <Text style={styles.contentText}>
                        In these Website Standard Terms and Conditions, “Your Content” shall
                        mean any audio, video text, images or other material you choose to
                        display on this Website. By displaying Your Content, you grant
                        Company Name a non-exclusive, worldwide irrevocable, sub licensable
                        license to use, reproduce, adapt, publish, translate and distribute
                        it in any and all media. Your Content must be your own and must not
                        be invading any third-party's rights. Company Name reserves the
                        right to remove any of Your Content from this Website at any time
                        without notice. No warranties\n This Website is provided “as is,”
                        with all faults, and Company Name express no representations or
                        warranties, of any kind related to this Website or the materials
                        contained on this Website. Also, nothing contained on this Website
                        shall be interpreted as advising you.
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Limitation of liability</Text>
                    <Text style={styles.contentText}>
                        In no event shall Company Name, nor any of its officers, directors
                        and employees, shall be held liable for anything arising out of or
                        in any way connected with your use of this Website whether such
                        liability is under contract. Company Name, including its officers,
                        directors and employees shall not be held liable for any indirect,
                        consequential or special liability arising out of or in any way
                        related to your use of this Website.
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Indemnification:</Text>
                    <Text style={styles.contentText}>
                        You hereby indemnify to the fullest extent Company Name from and
                        against any and/or all liabilities, costs, demands, causes of
                        action, damages and expenses arising in any way related to your
                        breach of any of the provisions of these Terms
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Severability</Text>
                    <Text style={styles.contentText}>
                        If any provision of these Terms is found to be invalid under any
                        applicable law, such provisions shall be deleted without affecting
                        the remaining provisions herein
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Variation of Terms</Text>
                    <Text style={styles.contentText}>
                        Company Name is permitted to revise these Terms at any time as it
                        sees fit, and by using this Website you are expected to review these
                        Terms on a regular basis
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Assignment</Text>
                    <Text style={styles.contentText}>
                        The Company Name is allowed to assign, transfer, and subcontract its
                        rights and/or obligations under these Terms without any
                        notification. However, you are not allowed to assign, transfer, or
                        subcontract any of your rights and/or obligations under these Terms.
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Entire Agreement</Text>
                    <Text style={styles.contentText}>
                        These Terms constitute the entire agreement between company name and
                        you in relation to your use of this Website, and supersede all prior
                        agreements and understandings.
                    </Text>
                </View>
                <View>
                    <Text style={styles.labelText}>Governing Law & Jurisdictions</Text>
                    <Text style={styles.contentText}>
                        These Terms will be governed by and interpreted in accordance with
                        the laws of the State of Country, and you submit to the
                        non-exclusive jurisdiction of the state and federal courts located
                        in Country for the resolution of any disputes
                    </Text>
                </View>
                {/* <Text style={[styles.labelText, { color: COLORS.BLACK }]}>
        For more information visit:{'\n'}
        <Text
            style={{ color: '#00796A', textDecorationLine: 'underline' }}
            onPress={() =>
                Linking.openURL('https://app.onit.services/privacy-policy')
            }>
            https://app.onit.services/privacy-policy
        </Text>
    </Text> */}
            </ScrollView>
        </View>
    )
}

export default Privacy

const styles = StyleSheet.create({
    labelText: {
        fontFamily: 'poppins-semibold',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 6,
        alignSelf: 'flex-start',
        textAlign: 'justify',
        color: 'green',
    },
    labelText2: {
        fontFamily: 'poppins-semibold',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 6,
        alignSelf: 'flex-start',
        textAlign: 'justify',
        // color: COLORS.BLACK2,
    },
    labelText3: {
        fontFamily: 'poppins-semibold',
        fontWeight: 'bold',
        textAlign: 'justify',
        color: 'black',
    },
    contentText: {
        textAlign: 'justify',
        fontFamily: 'poppins-semibold',
        // fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.3,
        color: 'black'
    },
})