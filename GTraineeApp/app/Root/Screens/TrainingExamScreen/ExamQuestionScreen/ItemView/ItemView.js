import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './ItemViewStyle';
import { Image, TouchableOpacity } from 'react-native';
import { Footer, Button } from 'native-base';
let counter = 0
let ansArr = []

export default class ItemView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            radioSelected: null,
            correctAnsId: null,
            count: 0,
            question_id: null,
            ansArray: [],
            answer_id: null
        }

    }

    radioClick(item, questionId) {
        this.props.handleCount(item,questionId)
        this.setState({
            radioSelected: item.id,
        })
        // this.props.sendSelectedAnsData(item.id);

        //console.log(item.id)
        //console.log(this.state.correctAnsId)

        // if (item.id == this.state.correctAnsId) {
        //     counter = counter + 1
        //     this.setState({ count: counter })
        //     // console.log(counter)
        //     this.props.handleCount(counter)
        // }
        // if (ansArr.length > 0) {
        //     // ansArr.find(item => item.question_id == this.state.question_id).answer_id = item.id
        //     if (ansArr.some(e => e.question_id === this.state.question_id)) {
        //         ansArr.find(item => item.question_id == this.state.question_id).answer_id = item.id
        //         this.props.handleCount(ansArr)
        //     } else {
        //         const ansObj = {
        //             question_id: this.state.question_id,
        //             answer_id: item.id
        //         }
        //         ansArr.push(ansObj)
        //         this.props.handleCount(ansArr)
        //     }
        // } else {
        //     const ansObj = {
        //         question_id: this.state.question_id,
        //         answer_id: item.id
        //     }
        //     ansArr.push(ansObj)
        //     this.props.handleCount(ansArr)
        // }
        //this.props.handleCount(ansArr)

    }

    componentWillMount() {
        const { item } = this.props;
        this.setState({
            correctAnsId: item.correct_answer,
            question_id: item.question_id
        })
    }

    // componentWillUnmount() {
    //     ansArr = []
    // }

    render() {
        const { item, result } = this.props;
        return (
            <View style={styles.container} >
                <Text style={{ fontSize: 25 }}>{item.question} ? </Text>
                {
                    !result ?
                        <View>
                            {
                                item.ans_options.map((data, index) =>
                                    <TouchableOpacity key={index} onPress={this.radioClick.bind(this, data,item.question_id )}>
                                        <View style={styles.innerView}>
                                            <View style={styles.outerCircle}>
                                                {
                                                    // data.id == this.state.radioSelected  ?
                                                    //     <View style={styles.innerCircle} />
                                                    //     : null
                                                    data.id == item.selectedAns_Id  ?
                                                        <View style={styles.innerCircle} />
                                                        : null
                                                }
                                            </View>
                                            <Text style={{ paddingLeft: 20 }}>{data.answer}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        :
                        <View>
                            {
                                item.ans_options.map((data, index) =>
                                    // item.user_answer == null ?
                                    //     <View style={styles.innerView}>
                                    //         <View style={styles.outerCircle} />
                                    //         <Text style={{ paddingLeft: 20 }}>{data.answer}</Text>
                                    //     </View>
                                    //     :
                                        (item.user_answer == item.correct_answer && data.id == item.user_answer) || data.id == item.correct_answer ?
                                            <View style={styles.innerView}>
                                                <View style={styles.outerCircle}>
                                                    <View style={styles.innerGreenCircle} />
                                                </View>
                                                <Text style={{ paddingLeft: 20, color: 'green', fontWeight: 'bold' }}>{data.answer}</Text>
                                            </View>
                                            :
                                            data.id == item.user_answer && item.user_answer != null ?
                                                <View style={styles.innerView}>
                                                    <View style={styles.outerCircle}>
                                                        <View style={styles.innerRedCircle} />
                                                    </View>
                                                    <Text style={{ paddingLeft: 20, color: 'red', fontWeight: 'bold' }}>{data.answer}</Text>
                                                </View>
                                                :

                                                <View style={styles.innerView}>
                                                    <View style={styles.outerCircle} />
                                                    <Text style={{ paddingLeft: 20 }}>{data.answer}</Text>
                                                </View>
                                )}
                        </View>
                }

            </View>
        )
    }
}
