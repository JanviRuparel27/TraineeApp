import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import ItemView from './ItemView'
import { Container } from 'native-base'
import { MainHeader, Loader } from 'app/Component';
import { left } from 'app/assets';

class GeneralFeedbackScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            answerArr:[],
            questions: [
                {
                    "id": 1,
                    "question": "The objective of the training was clearly defined"
                },
                {
                    "id": 2,
                    "question": "The training objective was met"
                }
            ],
            radioButtonValue: [
                {
                    "id": 1,
                    "ans": "Strongly Disagree"
                },
                {
                    "id": 2,
                    "ans": "Disagree"
                },
                {
                    "id": 3,
                    "ans": "Neutral"
                },
                {
                    "id": 4,
                    "ans": "Agree"
                },
                {
                    "id": 5,
                    "ans": "Strongly Agree"
                }

            ]
        }
    }

    handleSubmitAns = (ansArr) => {
        //console.log(ansArr)
        this.setState({ answerArr:ansArr },()=>console.log(this.state.answerArr))
    }

    render() {
        const { questions,radioButtonValue } = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'General Feedback'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <FlatList
                    data={questions}
                    renderItem={({ item }) =>
                        <ItemView item={item} handleCount={this.handleSubmitAns} option={radioButtonValue} />
                    }
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralFeedbackScreen)
