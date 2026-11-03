import { Component, type ErrorInfo } from "react";
import type { Props, State } from "../../types/error";
import styles from '../../module/ErrorBoundary.module.css';
export class ErrorBoundary extends Component<Props, State> {

    public state: State = { hasError: false };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({
            hasError: false,
            error: undefined
        });

        window.location.reload();
    };
    render() {

        if (this.state.hasError) {
            return (
                <div className={styles.errorContainer}>
                    <h1 className={styles.errorTitle}>{this.props.title ?? "Opps! Something went wrong"}</h1>
                    <p className={styles.errorMessage}>
                        {this.props.message ?? "We encountered an unexpected error. Please try again."}
                    </p>
                    <button className={styles.reloadButton} onClick={this.handleRetry}>Reload Application</button>
                </div>
            )
        }
        return this.props.children
    }
}