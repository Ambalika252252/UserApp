import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const ProfileScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>ProfileScreen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBF8F1",
    },
});
export default ProfileScreen;