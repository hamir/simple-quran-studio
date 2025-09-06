import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Surah} from '../data/surahs';
import {AyahData, AyahFragment} from '../types/ayah';

interface SurahEditorProps {
  surah: Surah;
  onBack: () => void;
}

const SurahEditor: React.FC<SurahEditorProps> = ({surah, onBack}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [ayahData, setAyahData] = useState<AyahData | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('🟡 SurahEditor render - surah:', surah);

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    },
    header: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
      borderBottomColor: isDarkMode ? '#333333' : '#e0e0e0',
    },
    backButton: {
      backgroundColor: isDarkMode ? '#007AFF' : '#007AFF',
    },
    backButtonText: {
      color: '#ffffff',
    },
    title: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    subtitle: {
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    verseBox: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
      borderColor: isDarkMode ? '#333333' : '#e0e0e0',
    },
    verseNumber: {
      color: isDarkMode ? '#007AFF' : '#007AFF',
    },
    arabicText: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    translationText: {
      color: isDarkMode ? '#cccccc' : '#333333',
    },
  });

  const loadAyahData = useCallback(async () => {
    try {
      console.log('🟠 Starting to load ayah data for surah:', surah.number);
      setLoading(true);

      // Try to fetch the JSON file
      console.log('🟠 Fetching from /ayah_fragments.json');
      const response = await fetch('/ayah_fragments.json');
      console.log('🟠 Response status:', response.status, 'ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ayahFragments: AyahData = await response.json();
      console.log(
        '🟠 Loaded ayah fragments, total keys:',
        Object.keys(ayahFragments).length,
      );

      // Filter data for this surah only
      const surahData: AyahData = {};
      for (const key in ayahFragments) {
        if (key.startsWith(`${surah.number}:`)) {
          surahData[key] = ayahFragments[key];
        }
      }

      console.log(
        '🟠 Filtered surah data, verses found:',
        Object.keys(surahData).length,
      );
      console.log('🟠 Verse keys:', Object.keys(surahData));
      setAyahData(surahData);
    } catch (error) {
      console.error('🔴 Error loading ayah data:', error);
      // Fallback: try to import directly
      try {
        console.log('🟠 Trying fallback method...');
        const ayahFragments = require('../../assets/ayah_fragments.json');
        const surahData: AyahData = {};
        for (const key in ayahFragments) {
          if (key.startsWith(`${surah.number}:`)) {
            surahData[key] = ayahFragments[key];
          }
        }
        console.log(
          '🟠 Fallback successful, verses found:',
          Object.keys(surahData).length,
        );
        setAyahData(surahData);
      } catch (fallbackError) {
        console.error('🔴 Fallback loading also failed:', fallbackError);
      }
    } finally {
      console.log('🟠 Setting loading to false');
      setLoading(false);
    }
  }, [surah.number]);

  useEffect(() => {
    loadAyahData();
  }, [surah.number, loadAyahData]);

  const renderVerse = (verseKey: string, fragments: AyahFragment[]) => {
    const verseNumber = verseKey.split(':')[1];

    return (
      <View key={verseKey} style={[styles.verseBox, dynamicStyles.verseBox]}>
        <View style={styles.verseHeader}>
          <Text style={[styles.verseNumber, dynamicStyles.verseNumber]}>
            {verseNumber}
          </Text>
        </View>
        <View style={styles.verseContent}>
          {fragments.map((fragment, index) => (
            <View key={index} style={styles.fragmentContainer}>
              <Text style={[styles.arabicText, dynamicStyles.arabicText]}>
                {fragment.qpc_hafs}
              </Text>
              <Text
                style={[styles.translationText, dynamicStyles.translationText]}>
                {fragment.en_khattab}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  console.log(
    '🟡 SurahEditor render - loading:',
    loading,
    'ayahData:',
    ayahData,
  );

  if (loading) {
    console.log('🟡 Showing loading state');
    return (
      <View
        style={[
          styles.container,
          dynamicStyles.container,
          styles.loadingContainer,
        ]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, dynamicStyles.subtitle]}>
          Loading verses...
        </Text>
      </View>
    );
  }

  const verseKeys = ayahData
    ? Object.keys(ayahData).sort((a, b) => {
        const aNum = parseInt(a.split(':')[1], 10);
        const bNum = parseInt(b.split(':')[1], 10);
        return aNum - bNum;
      })
    : [];

  console.log('🟡 SurahEditor render - verseKeys:', verseKeys);

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity
          style={[styles.backButton, dynamicStyles.backButton]}
          onPress={onBack}>
          <Text style={[styles.backButtonText, dynamicStyles.backButtonText]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.title, dynamicStyles.title]}>
          {surah.number}. {surah.englishName}
        </Text>
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          {surah.name} • {surah.numberOfAyahs} verses
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {verseKeys.map(verseKey => renderVerse(verseKey, ayahData![verseKey]))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
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
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  verseBox: {
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  verseHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  verseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  verseContent: {
    padding: 16,
  },
  fragmentContainer: {
    marginBottom: 12,
  },
  arabicText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'right',
    marginBottom: 4,
    lineHeight: 28,
  },
  translationText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default SurahEditor;
