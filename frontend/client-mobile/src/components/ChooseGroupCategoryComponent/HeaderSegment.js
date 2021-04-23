import React from 'react';
import { Button, Segment, Text } from 'native-base';
export default function HeaderSegment(props) {
    return (
        <Segment
            style={{ backgroundColor: 'green' }}
        >
            <Button
                first
                active={props.isActiveSegment1}
                onPress={props.changeActiveSegment1}
            >
                <Text>Nợ/ Cho vay</Text>
            </Button>
            <Button
                active={props.isActiveSegment2}
                onPress={props.changeActiveSegment2}
            >
                <Text>Khoản chi</Text>
            </Button>
            <Button
                last
                active={props.isActiveSegment3}
                onPress={props.changeActiveSegment3}
            >
                <Text>Khoản thu</Text>
            </Button>
        </Segment>
    )
}
