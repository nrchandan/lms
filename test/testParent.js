'use strict';

const Parent = artifacts.require('../contracts/Parent.sol');
const Organisation = artifacts.require('../contracts/Organisation.sol');


contract('Parent', function(accounts) {
    let parent;

    beforeEach(async function() {
        parent = await Parent.new();
    });

    describe('registerOrganisation', function() {
        it.only('should register a new organisation', async function() {
            console.log(parent.address);

            let org = await Organisation.new();
            console.log(org.address);
            await org.setDataStore(0x0, 0x0);

            await parent.registerOrganisation('Hyd', org.address);
            let orgAdr = await parent.getOrganisation('Hyd');
            console.log(orgAdr);
            let memberCount = await org.memberCount();
            assert.equal(memberCount.valueOf(), 0);

            await org.addMember('John Doe', 'john.doe@example.com', accounts[5]);
            memberCount = await org.memberCount();
            assert.equal(memberCount.valueOf(), 1);

            let newOrg = await Organisation.new();
            console.log(newOrg.address);
            await parent.upgradeOrganisation('Hyd', newOrg.address);
            memberCount = await newOrg.memberCount();
            assert.equal(memberCount.valueOf(), 1);
        });
    });
});
