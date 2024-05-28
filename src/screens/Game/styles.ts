import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  board: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.doubleBaseMargin * 2,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: Metrics.baseMargin,
    justifyContent: 'space-between',
  },
  sound: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
  },
  score: {
    color: 'white',
    fontFamily: 'Relay-Bold',
    fontSize: Metrics.ratio(40),
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Relay-Bold',
    fontSize: Metrics.ratio(120),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Metrics.doubleBaseMargin * 2,
  },
  button: {
    margin: Metrics.smallMargin,
    width: Metrics.screenWidth / 2 - Metrics.doubleBaseMargin,
    height: Metrics.screenWidth / 2 - Metrics.doubleBaseMargin,
  },
});
