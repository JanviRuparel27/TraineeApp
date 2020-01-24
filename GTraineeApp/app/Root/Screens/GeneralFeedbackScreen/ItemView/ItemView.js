import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './ItemViewStyle';
import { Image, TouchableOpacity } from 'react-native';
import { Footer, Button } from 'native-base';
import { TextView } from 'app/Component';

let counter = 0
let ansArr = []

export default class ItemView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            radioSelected: null,
            count: 0,
            question_id: null,
            ansArray: [],
            ans: null
        }

    }

    radioClick(item) {
        this.setState({
            radioSelected: item.id,
        })
        //console.log(item.id)
        if (ansArr.length > 0) {
            // ansArr.find(item => item.question_id == this.state.question_id).ans = item.id
            if (ansArr.some(e => e.question_id === this.state.question_id)) {
                ansArr.find(item => item.question_id == this.state.question_id).ans = item.id
                this.props.handleCount(ansArr)
            } else {
                const ansObj = {
                    question_id: this.state.question_id,
                    ans: item.id
                }
                ansArr.push(ansObj)
                this.props.handleCount(ansArr)
            }
        } else {
            const ansObj = {
                question_id: this.state.question_id,
                ans: item.id
            }
            ansArr.push(ansObj)
            this.props.handleCount(ansArr)
        }
    }

    componentWillMount() {
        const { item } = this.props;
        this.setState({
            question_id: item.id
        })
    }

    componentWillUnmount() {
        ansArr = []
    }

    render() {
        const { item, result, option } = this.props;
        return (
            <View style={styles.container} >
                <TextView style={styles.font}>{item.question} ? </TextView>
                <View>
                    {
                        option.map((data, index) =>
                            <TouchableOpacity key={index} onPress={this.radioClick.bind(this, data)}>
                                <View style={styles.innerView}>
                                    <View style={styles.outerCircle}>
                                        {
                                            data.id == this.state.radioSelected ?
                                                <View style={styles.innerCircle} />
                                                : null
                                        }
                                    </View>
                                    <Text style={styles.innerFont}>{data.ans}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        )
    }
}
