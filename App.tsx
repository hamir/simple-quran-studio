import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const dynamicStyles = StyleSheet.create({
    background: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    },
    content: {
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    title: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    subtitle: {
      color: isDarkMode ? '#cccccc' : '#333333',
    },
    sectionTitle: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    sectionText: {
      color: isDarkMode ? '#cccccc' : '#333333',
    },
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.background]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={dynamicStyles.background.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={dynamicStyles.background}>
        <View style={[styles.content, dynamicStyles.content]}>
          <Text style={[styles.title, dynamicStyles.title]}>
            Welcome to Simple Quran Studio
          </Text>
          <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
            A React Native app for Quran study and recitation
          </Text>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
              Getting Started
            </Text>
            <Text style={[styles.sectionText, dynamicStyles.sectionText]}>
              Edit <Text style={styles.highlight}>App.tsx</Text> to start
              building your Quran Studio features.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
              Features
            </Text>
            <Text style={[styles.sectionText, dynamicStyles.sectionText]}>
              • Cross-platform support (iOS, Android, Web)
            </Text>
            <Text style={[styles.sectionText, dynamicStyles.sectionText]}>
              • TypeScript support
            </Text>
            <Text style={[styles.sectionText, dynamicStyles.sectionText]}>
              • Hot reloading
            </Text>
            <Text style={[styles.sectionText, dynamicStyles.sectionText]}>
              • Expo development tools
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
  highlight: {
    fontWeight: '700',
    color: '#007AFF',
  },
});

export default App;
