import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useMemo, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

type MessageType = {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
};

const TABS = ['Входящие', 'Исходящие', 'Объявления'] as const;
type TabType = typeof TABS[number];

const SAMPLE_DATA: Record<TabType, MessageType[]> = {
  'Входящие': [
    { id: '1', title: 'Расписание на неделю', author: 'Администрация', date: '2025-02-05', content: 'Уважаемые студенты, обратите внимание на изменения в расписании занятий на следующую неделю...' },
    { id: '2', title: 'Важное уведомление', author: 'Деканат', date: '2025-02-04', content: 'Напоминаем о предстоящей сдаче курсовых работ...' },
    { id: '3', title: 'Спортивные мероприятия', author: 'Спортивный клуб', date: '2025-02-03', content: 'Приглашаем принять участие в университетских соревнованиях...' },
    { id: '4', title: 'Библиотека', author: 'Библиотекарь', date: '2025-02-02', content: 'Просим вернуть книги до конца недели...' },
    { id: '5', title: 'Студенческий совет', author: 'Председатель', date: '2025-02-01', content: 'Приглашаем на собрание студенческого совета...' },
    { id: '6', title: 'Студенческий совет', author: 'Председатель', date: '2025-02-01', content: 'Приглашаем на собрание студенческого совета...' },
    { id: '7', title: 'Студенческий совет', author: 'Председатель', date: '2025-02-01', content: 'Приглашаем на собрание студенческого совета...' },
    { id: '8', title: 'Студенческий совет', author: 'Председатель', date: '2025-02-01', content: 'Приглашаем на собрание студенческого совета...' },
    { id: '9', title: 'Студенческий совет', author: 'Председатель', date: '2025-02-01', content: 'Приглашаем на собрание студенческого совета...' },
    { id: '10', title: 'Студенческий совет', author: 'Председатель', date: '2025-02-01', content: 'Приглашаем на собрание студенческого совета...' },
    { id: '11', title: 'Студенческий совет', author: 'Председатель', date: '2025-02-01', content: 'Приглашаем на собрание студенческого совета...' },
  ],
  'Исходящие': [
    { id: '6', title: 'Заявление на справку', author: 'Вы', date: '2025-02-05', content: 'Прошу выдать справку о том, что я являюсь студентом...' },
    { id: '7', title: 'Запрос на пересдачу', author: 'Вы', date: '2025-02-04', content: 'Прошу разрешить пересдачу экзамена...' },
    { id: '8', title: 'Участие в конференции', author: 'Вы', date: '2025-02-03', content: 'Заявка на участие в научной конференции...' },
    { id: '9', title: 'Справка в общежитие', author: 'Вы', date: '2025-02-02', content: 'Прошу предоставить справку для общежития...' },
    { id: '10', title: 'Запрос материалов', author: 'Вы', date: '2025-02-01', content: 'Прошу предоставить дополнительные материалы по курсу...' },
  ],
  'Объявления': [
    { id: '11', title: 'День открытых дверей', author: 'Приемная комиссия', date: '2025-02-05', content: 'Приглашаем всех желающих на день открытых дверей...' },
    { id: '12', title: 'Вакансии', author: 'Центр карьеры', date: '2025-02-04', content: 'Открыты новые вакансии для студентов...' },
    { id: '13', title: 'Культурное мероприятие', author: 'Студклуб', date: '2025-02-03', content: 'Приглашаем на концерт студенческой самодеятельности...' },
    { id: '14', title: 'Конкурс проектов', author: 'Научный отдел', date: '2025-02-02', content: 'Объявляется конкурс студенческих проектов...' },
    { id: '15', title: 'Волонтерство', author: 'Волонтерский центр', date: '2025-02-01', content: 'Набор волонтеров для участия в городском мероприятии...' },
  ],
};

export default function MessagesScreen() {
  const heightHeader = useHeaderHeight()
  const bottomHeight = useBottomTabBarHeight()
  const [activeTab, setActiveTab] = useState<TabType>('Входящие');
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  
  const snapPoints = useMemo(() => ['50%', "80%"], []);

  const handlePresentModal = useCallback((message: MessageType) => {
    setSelectedMessage(message);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    []
  );

  const renderMessage = useCallback(({ item }: { item: MessageType }) => (
    <Pressable
      style={styles.messageItem}
      onPress={() => handlePresentModal(item)}
    >
      <Text style={styles.messageTitle}>{item.title}</Text>
      <Text style={styles.messageAuthor}>{item.author}</Text>
      <Text style={styles.messageDate}>{item.date}</Text>
    </Pressable>
  ), []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <LinearGradient
          colors={['#462ab2', '#1e124c']}
          style={styles.container}
        >
          <View style={{...styles.tabContainer, marginTop: heightHeader}}>
            {TABS.map((tab) => (
              <Pressable
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>

          <FlashList
            data={SAMPLE_DATA[activeTab]}
            renderItem={renderMessage}
            estimatedItemSize={80}
            contentContainerStyle={{...styles.listContainer, paddingBottom: bottomHeight + 60}}
          />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={() => {}}
            onDismiss={handleDismiss}
            enablePanDownToClose
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetIndicator}
            style={styles.bottomSheet}
            android_keyboardInputMode="adjustResize"
          >
            {selectedMessage && (
              <View style={styles.bottomSheetContent}>
                <Text style={styles.modalTitle}>{selectedMessage.title}</Text>
                <View style={styles.messageInfo}>
                  <Text style={styles.modalInfo}>От: {selectedMessage.author}</Text>
                  <Text style={styles.modalInfo}>Дата: {selectedMessage.date}</Text>
                </View>
                <Text style={styles.modalText}>{selectedMessage.content}</Text>
              </View>
            )}
          </BottomSheetModal>
        </LinearGradient>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  messageItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  messageTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageAuthor: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  messageDate: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
  },
  messageInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalInfo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  modalText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  bottomSheet: {
    zIndex: 9999,
    elevation: 9999,
    position: 'relative',
  },
  bottomSheetBackground: {
    backgroundColor: 'rgba(30, 18, 76, 1)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 40,
  },
});
