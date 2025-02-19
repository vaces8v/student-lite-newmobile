import { createStyleSheet } from 'react-native-unistyles';

export const styles = createStyleSheet(theme => ({
  container: {
    position: 'relative',
  },
  blurView: {
    borderRadius: 20,
    marginTop: 10,
    overflow: 'hidden',
    width: '100%',
    marginHorizontal: 'auto',
  },
  lessonContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: '100%',
    height: 'auto',
  },
  idContainer: {
    paddingHorizontal: 5,
    height: '100%',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'flex-start',
  },
  idText: {
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 2,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  timeText: {
    textAlign: 'center',
  },
  lessonColorLine: {
    width: 2,
    height: '100%',
    marginHorizontal: 2,
  },
  lessonDetails: {
    paddingHorizontal: 5,
    height: 'auto',
    justifyContent: 'flex-start',
  },
  lessonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  teacherText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  themeText: {
    fontSize: 15,
    marginTop: 2,
  },
  homeworkText: {
    fontSize: 15,
    marginTop: 2,
  },
  homeworkItemText: {
    fontSize: 14,
  },
  noHomeworkText: {
    textAlign: 'justify',
    fontFamily: 'Poppins-Medium',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  ratingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    minWidth: 30,
    minHeight: 30,
  },
  ratingText: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 22,
    bottom: -7,
    fontFamily: 'Poppins-Medium',
  },
  passBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 60,
    height: 30,
  },
}));