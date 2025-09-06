import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Dimensions,
} from 'react-native';
import {Surah, surahs} from '../data/surahs';

interface SurahListProps {
  onSurahPress: (surah: Surah) => void;
}

const SurahList: React.FC<SurahListProps> = ({onSurahPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 40 - 16) / 3; // 40 for margins, 16 for gaps

  console.log('🔵 SurahList render - onSurahPress:', typeof onSurahPress);

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    },
    item: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
      borderBottomColor: isDarkMode ? '#333333' : '#e0e0e0',
      width: cardWidth,
    },
    surahNumber: {
      color: isDarkMode ? '#007AFF' : '#007AFF',
    },
    surahName: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    surahNameArabic: {
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    surahInfo: {
      color: isDarkMode ? '#999999' : '#666666',
    },
    revelationType: {
      color: isDarkMode ? '#34C759' : '#28a745',
    },
  });

  const renderSurahItem = ({item}: {item: Surah}) => (
    <TouchableOpacity
      style={[styles.surahItem, dynamicStyles.item]}
      onPress={() => {
        console.log('🔵 SurahList: Item pressed:', item);
        alert(`Surah ${item.number} pressed!`);
        onSurahPress(item);
      }}
      activeOpacity={0.7}>
      <View style={styles.surahContent}>
        <View style={styles.surahNumberContainer}>
          <Text style={[styles.surahNumber, dynamicStyles.surahNumber]}>
            {item.number}
          </Text>
        </View>
        <Text
          style={[styles.surahName, dynamicStyles.surahName]}
          numberOfLines={1}>
          {item.englishName}
        </Text>
        <Text
          style={[styles.surahNameArabic, dynamicStyles.surahNameArabic]}
          numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.ayahCount, dynamicStyles.surahInfo]}>
          {item.numberOfAyahs} verses
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={surahs}
      renderItem={renderSurahItem}
      keyExtractor={item => item.number.toString()}
      style={[styles.container, dynamicStyles.container]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      numColumns={3}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  surahItem: {
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  surahContent: {
    padding: 12,
    alignItems: 'center',
  },
  surahNumberContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  surahNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  surahName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  surahNameArabic: {
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 6,
  },
  ayahCount: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SurahList;
