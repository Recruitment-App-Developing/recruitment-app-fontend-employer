import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

interface CvUploadProgressProp {
    sessionId: string;
    handleProgress: () => {};
}

interface CvStatus {
    cvId: string;
    status: string;
}

interface CvProgress {
    id: string | null;
    total: number;
    done: number;
    statuses: CvStatus[];
}

export default function useCvUploadProgress({ sessionId }): CvProgress {
    const [progress, setProgress] = useState<CvProgress>({
        id: null,
        total: 0,
        done: 0,
        statuses: [],
    });

    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (sessionId !== null && sessionId !== '') {
            const socket = new SockJS('http://localhost:8080/ws');
            const client = new Client({
                webSocketFactory: () => socket,
                debug: (msg) => console.log('[WebSocket Debug]', msg),
                onConnect: () => {
                    console.log('✅ Connected to WebSocket: ', sessionId);
                    client.subscribe(
                        `/topic/cv-status/${sessionId}`,
                        (msg: IMessage) => {
                            const { cvId, status, totalFiles, completedFiles } =
                                JSON.parse(msg.body);
                            console.log('📩 Received from BE:', msg.body);

                            setProgress((prev) => {
                                const newProgress = {
                                    id: cvId,
                                    total: totalFiles,
                                    done: completedFiles,
                                    statuses: [
                                        ...prev.statuses,
                                        { cvId, status },
                                    ],
                                };

                                if (
                                    newProgress.done >= newProgress.total &&
                                    clientRef.current
                                ) {
                                    console.log(
                                        '📴 Đã xử lý xong, ngắt kết nối WebSocket',
                                    );
                                    clientRef.current.deactivate();
                                }

                                return newProgress;
                            });
                        },
                    );
                },
                onStompError: (frame) => {
                    console.error('STOMP error', frame);
                },
            });

            clientRef.current = client;
            client.activate();

            return () => {
                if (clientRef.current) {
                    clientRef.current.deactivate();
                    clientRef.current = null;
                }
            };
        }
    }, [sessionId]);

    return progress;
}
