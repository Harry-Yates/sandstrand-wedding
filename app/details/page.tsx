import { Container, Title, Section } from '@/components/ui';
import Navbar from '@/components/Navbar';

export default function DetailsPage() {
    return (
        <>
            <Navbar />
            <Section dark>
                <Container>
                    <Title dark>Details</Title>
                    <main className="flex flex-col justify-center items-center min-h-[80vh]">
                        <h1 className="text-4xl font-bold mb-4 text-text-primary">Details Page</h1>
                        <p className="text-lg text-text-secondary">
                            This page is under construction. Please check back later.
                        </p>
                    </main>
                </Container>
            </Section>
        </>
    );
} 