import { execSync } from 'child_process';

const featurePath = process.argv[2];

if (!featurePath) {
    console.error('Please provide a feature file path.');
    process.exit(1);
}

const command = `cucumber-js ${featurePath}`;
execSync(command, { stdio: 'inherit' });
