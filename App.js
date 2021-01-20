import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Picker,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
});

export default class TimePicker extends Component {
  static propTypes = {
    selectedHours: PropTypes.number,
    selectedMinutes: PropTypes.number,
    onChange: PropTypes.func,
    hoursUnit: PropTypes.string,
    minutesUnit: PropTypes.string,
    maxHours: PropTypes.number,
    minHours: PropTypes.number,
    maxMins: PropTypes.number,
    minMins: PropTypes.number,
    hrsInterval: PropTypes.number,
    minsInterval: PropTypes.number,
  }

  static defaultProps = {
    selectedHours: 0,
    selectedMinutes: 0,
    onChange: null,
    hoursUnit: '',
    minutesUnit: '',
    maxHours: 24,
    minHours: 0,
    maxMins: 60,
    minMins: 0,
    hrsInterval: 1,
    minsInterval: 1,
  }

  constructor(props) {
    super(props);
    const { selectedHours, selectedMinutes } = props;
    this.state = {
      selectedHours,
      selectedMinutes,
    };
  }

  getHoursItems = () => {
    const items = [];
    const { hoursUnit } = this.props;
    const { minHours } = this.props;
    const { maxHours } = this.props;
    const { hrsInterval } = this.props;
    for (let i = minHours; i <= maxHours; i+=hrsInterval) {
      items.push(
        <Picker.Item key={i} value={i} label={`${i.toString()}${hoursUnit}`} />,
      );
    }
    return items;
  }

  getMinutesItems = () => {
    const items = [];
    const { minutesUnit } = this.props;
    const { minMins } = this.props;
    const { maxMins } = this.props;
    const { minsInterval } = this.props;
    for (let i = minMins; i <= maxMins; i+=minsInterval) {
      items.push(
        <Picker.Item key={i} value={i} label={`${i.toString()}${minutesUnit}`} />,
      );
    }
    return items;
  }

  handleChangeHours = (itemValue) => {
    const { onChange } = this.props;
    this.setState({
      selectedHours: itemValue,
    }, () => {
      const { selectedHours, selectedMinutes } = this.state;
      onChange(selectedHours, selectedMinutes);
    });
  }

  handleChangeMinutes = (itemValue) => {
    const { onChange } = this.props;
    this.setState({
      selectedMinutes: itemValue,
    }, () => {
      const { selectedHours, selectedMinutes } = this.state;
      onChange(selectedHours, selectedMinutes);
    });
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={selectedHours}
          onValueChange={(itemValue) => this.handleChangeHours(itemValue)}
        >
          {this.getHoursItems()}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedMinutes}
          onValueChange={(itemValue) => this.handleChangeMinutes(itemValue)}
        >
          {this.getMinutesItems()}
        </Picker>
      </View>
    );
  }
}
