import { Component } from "react";
import { Text, TextStyle } from "react-native";
import { vw } from "./stylesheet";

export class Nunito12Med extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Medium', color: this.props.color, fontSize: vw(3) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito14Med extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Medium', color: this.props.color, fontSize: vw(3.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito16Med extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Medium', color: this.props.color, fontSize: vw(4) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito18Med extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Medium', color: this.props.color, fontSize: vw(4.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito10Reg extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Regular', color: this.props.color, fontSize: vw(2.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito12Reg extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Regular', color: this.props.color, fontSize: vw(3) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito14Reg extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Regular', color: this.props.color, fontSize: vw(3.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito16Reg extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Regular', color: this.props.color, fontSize: vw(4) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito24Reg extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Regular', color: this.props.color, fontSize: vw(6) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito18Reg extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Regular', color: this.props.color, fontSize: vw(4.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito12Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Bold', color: this.props.color, fontSize: vw(3) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito14Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Bold', color: this.props.color, fontSize: vw(3.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito16Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Bold', color: this.props.color, fontSize: vw(4) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito18Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Bold', color: this.props.color, fontSize: vw(4.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito20Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Bold', color: this.props.color, fontSize: vw(5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito22Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Bold', color: this.props.color, fontSize: vw(5.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito24Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-Bold', color: this.props.color, fontSize: vw(6) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Nunito14ExBold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Nunito-ExtraBold', color: this.props.color, fontSize: vw(3.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Signika20Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Signika-Bold', color: this.props.color, fontSize: vw(5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Signika22Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Signika-Bold', color: this.props.color, fontSize: vw(5.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Signika24Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Signika-Bold', color: this.props.color, fontSize: vw(6) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Signika28Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Signika-Bold', color: this.props.color, fontSize: vw(7) }, style]}>
                {children}
            </Text>
        );
    }
}

export class SonsieOne100 extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'SonsieOne-Regular', color: this.props.color, fontSize: vw(25) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Signika20SemiBold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Signika-SemiBold', color: this.props.color, fontSize: vw(5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Signika22SemiBold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Signika-SemiBold', color: this.props.color, fontSize: vw(5.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Signika24SemiBold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Signika-SemiBold', color: this.props.color, fontSize: vw(6) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Roboto20Med extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Roboto-Medium', color: this.props.color, fontSize: vw(5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Roboto16Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Roboto-Bold', color: this.props.color, fontSize: vw(4) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Roboto20Bold extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Roboto-Bold', color: this.props.color, fontSize: vw(5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class SFproDisplay20Med extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'SF-Pro-Display-Medium', color: this.props.color, fontSize: vw(5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class SVNHara extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'SVN-Harabaras', color: this.props.color, fontSize: vw(5) }, style]}>
                {children}
            </Text>
        )
    }
}

export class Roboto24Black extends Component<{ children: React.ReactNode, style?: TextStyle | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Roboto-Black', color: this.props.color, fontSize: vw(6) }, style]}>
                {children}
            </Text>
        )
    }
}