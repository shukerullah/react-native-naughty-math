import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

const distance = Metrics.screenHeight / 5.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: Metrics.baseMargin,
    backgroundColor: Colors.backgroundColor,
  },
  logo: {
    marginVertical: distance,
    width: Metrics.ratio(200),
    height: Metrics.ratio(122),
  },
  button: {
    width: Metrics.ratio(100),
    height: Metrics.ratio(51.2),
  },
  smallButton: {
    width: Metrics.ratio(70),
    height: Metrics.ratio(35.84),
    marginHorizontal: Metrics.smallMargin,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.doubleBaseMargin,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Metrics.doubleBaseMargin,
    width: Metrics.screenWidth - Metrics.doubleBaseMargin * 2,
  },
});
