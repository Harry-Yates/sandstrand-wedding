import { Container, Title, Section } from '@/components/ui';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <Section dark>
                <Container>
                    <Title dark>Contact Us</Title>
                    <main className="flex flex-col justify-center items-center min-h-[80vh]">
                        <h1 className="text-4xl font-bold mb-4">Contact Page</h1>
                        <p className="text-lg text-gray-600">
                            This page is under construction. Please check back later.
                        </p>
                    </main>
                </Container>
            </Section>
        </>
    );
} 