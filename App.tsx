import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SurahList from './src/components/SurahList';
import SurahEditor from './src/components/SurahEditor';
import {Surah} from './src/data/surahs';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);

  const dynamicStyles = StyleSheet.create({
    background: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    },
    header: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
      borderBottomColor: isDarkMode ? '#333333' : '#e0e0e0',
    },
    title: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    subtitle: {
      color: isDarkMode ? '#cccccc' : '#666666',
    },
  });

  const handleSurahPress = (surah: Surah) => {
    setSelectedSurah(surah);
  };

  const handleBackToList = () => {
    setSelectedSurah(null);
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.background]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={dynamicStyles.background.backgroundColor}
      />
      {selectedSurah ? (
        <SurahEditor surah={selectedSurah} onBack={handleBackToList} />
      ) : (
        <>
          <View style={[styles.header, dynamicStyles.header]}>
            <Text style={[styles.title, dynamicStyles.title]}>
              Simple Quran Studio
            </Text>
            <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
              Select a Surah to read
            </Text>
          </View>
          <SurahList onSurahPress={handleSurahPress} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default App;
