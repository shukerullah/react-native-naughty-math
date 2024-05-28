import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

const width = Metrics.ratio(90) * 2 + Metrics.doubleBaseMargin * 3;

export default StyleSheet.create({
  container: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {},
  background: {
    width,
    height: width * 0.7005988023952096,
  },
  scoreContent: {
    width,
    position: 'absolute',
    top: Metrics.baseMargin,
  },
  title: {
    color: '#bdc3c7',
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Relay-Bold',
    fontSize: Metrics.ratio(40),
    marginBottom: Metrics.smallMargin,
  },
  score: {
    color: 'white',
    fontFamily: 'Relay-Bold',
    fontSize: Metrics.ratio(35),
    marginBottom: Metrics.smallMargin,
    marginLeft: Metrics.ratio(70),
  },
  bestScore: {
    color: 'white',
    fontFamily: 'Relay-Bold',
    fontSize: Metrics.ratio(35),
    marginLeft: Metrics.ratio(70),
  },
  practiceModeScore: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Relay-Bold',
    marginTop: Metrics.baseMargin,
    fontSize: Metrics.ratio(35),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin + Metrics.smallMargin,
  },
  button: {
    width: Metrics.ratio(100),
    height: Metrics.ratio(51.2),
  },
});
